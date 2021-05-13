import querystring from "querystring";
import { escapeTermsForAvailable } from "@/data/escapeTerms";
import resources from "@/data/resources";

export const getTweets = async (ids) => {
  const queryParams = querystring.stringify({
    ids: ids.join(","),
    expansions:
      "author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id",
    "tweet.fields":
      "attachments,author_id,public_metrics,created_at,id,in_reply_to_user_id,referenced_tweets,text",
    "user.fields": "id,name,profile_image_url,protected,url,username,verified",
    "media.fields":
      "duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics",
  });

  const response = await fetch(
    `https://api.twitter.com/2/tweets?${queryParams}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );

  const tweets = await response.json();

  const getAuthorInfo = (author_id) => {
    return tweets.includes.users.find((user) => user.id === author_id);
  };

  const getReferencedTweets = (mainTweet) => {
    return (
      mainTweet?.referenced_tweets?.map((referencedTweet) => {
        const fullReferencedTweet = tweets.includes.tweets.find(
          (tweet) => tweet.id === referencedTweet.id
        );

        return {
          type: referencedTweet.type,
          author: getAuthorInfo(fullReferencedTweet.author_id),
          ...fullReferencedTweet,
        };
      }) || []
    );
  };

  return tweets.data.reduce((allTweets, tweet) => {
    const tweetWithAuthor = {
      ...tweet,
      media:
        tweet?.attachments?.media_keys.map((key) =>
          tweets.includes.media.find((media) => media.media_key === key)
        ) || [],
      referenced_tweets: getReferencedTweets(tweet),
      author: getAuthorInfo(tweet.author_id),
    };

    return [tweetWithAuthor, ...allTweets];
  }, []);
};

export const getUser = async (username) => {
  const url = `https://api.twitter.com/2/users/by/username/${username}?user.fields=created_at,description,profile_image_url,public_metrics`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
  });
  const data = await response.json();
  return data;
};

export const prepareQuery = (city, resource, preference) => {
  city = city.toLowerCase();
  if (resource)
    resource = resource.toLowerCase();
  
  if (preference === 'get') {
    if (resource)
      return `covid available ${resource} ${city} (${escapeTermsForAvailable.join(" ")}) -is:retweet -is:reply -is:quote`;
    else { 
      return `covid available ${city} (${resources.join(" OR ")}) (${escapeTermsForAvailable.join(" ")}) -is:retweet -is:reply -is:quote`;
    }
  }
  if (preference === 'give') {

    if (resource) { 
      return `covid need ${resource} ${city} "donor" -is:retweet -is:reply -is:quote`;
    } else { 
      return `covid need ${city} (${resources.join(" OR ")})  "donor" -is:retweet -is:reply -is:quote`;
    }

  }
}

export const getTweetsBasedOnCrieteria = async (city, resource, preference, nextToken=null) => {
  const queryParams = querystring.stringify({
    "tweet.fields":
      "author_id,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,text",
    "user.fields":
      "created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld",
    "expansions": 
      "attachments.poll_ids,attachments.media_keys,author_id,geo.place_id,in_reply_to_user_id,referenced_tweets.id,entities.mentions.username,referenced_tweets.id.author_id",
    "media.fields":
      "duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics",
  });

  let queryString = "";
  let preparedUrl = "";

  // preparing query for fetching twitter covid data
  if (resource)
    queryString = prepareQuery(city, resource, preference);
  else 
    queryString = prepareQuery(city, null, preference);

  // if nextToken is available need to fetch next page records 
  // Otherwise fetch first page records 
  if (nextToken) {
    nextToken = '&next_token=' + nextToken
    preparedUrl = `https://api.twitter.com/2/tweets/search/recent?query=${queryString}&${queryParams}${nextToken}`;

  } else {
    preparedUrl = `https://api.twitter.com/2/tweets/search/recent?query=${queryString}&${queryParams}`;
  }


  try {
    const response = await fetch(
      preparedUrl,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
      }
    );

    const jsonResponse = await response.json(); 
    const tweets = jsonResponse.data;

    const queryTweets = [];
    const metaInfo = jsonResponse.meta;

    let tweetedUsers = [];
    if (jsonResponse.includes && jsonResponse.includes.users) {
        tweetedUsers = jsonResponse.includes.users;
       
        /**
         * users object 
         * key -> userid 
         * value -> userdata
         */
        const tweetedUsersObject = {};

        // iterate through users list
        tweetedUsers.forEach((user) => {
          tweetedUsersObject[user.id] = user;
        }) 

        // repeated tweets for igonre duplicates
        let repeatedTweets = {}

        // Regex to find @tags
        var regexp = new RegExp('(@[a-zA-Z0-9\_]+)','g');

        // Regex to find #tags
        var regexpTags = new RegExp('((#)([a-zA-Z0-9\_]+))','g');

        // Regex to find phone numbers
        var regexpPhone = new RegExp('(\\+?\\d[\\d\\ -]{8,12}\\d)','gm');
        
        // Regex to find urls
        const regexpURL = new RegExp(/((https?:\/\/\S*)|(www.\S*)|((http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)))/gi);

        // Iterate through all tweets
        tweets.forEach((tweet) => { 
          // removing all @tags, \n and trim the tweet text
          // this will help to remove duplicate tweets from the result
          const tweetText = tweet.text.replace(regexp," ").replace(/^\s+|\s+$/g, '').replace('\n', ' ');

          tweet.text = tweet.text.replace(regexpURL,`<a class='text-blue-500' href='$1'>$1</a>`);
          tweet.text = tweet.text.replace(regexp,`<a class='text-blue-500' href='https://www.twitter.com/$1'>$1</a>`);
          tweet.text = tweet.text.replace(regexpTags,`<a class='text-blue-500' href='https://twitter.com/hashtag/$3'>$1</a>`);
          tweet.text = tweet.text.replace(regexpPhone,`<a class='text-blue-500' href='tel:$1'>$1</a>`);
          
          // checking whether this tweets text available in the dict
          if (!repeatedTweets[tweetText]) {

            repeatedTweets[tweetText] = 1;

            // checking whether this tweet contains author info
            if ( tweetedUsersObject[tweet.author_id] ) {
              tweet['author'] = tweetedUsersObject[tweet.author_id];
 
              if (jsonResponse?.includes?.media) {
                tweet['media'] =  tweet?.attachments?.media_keys.map((key) =>
                  jsonResponse?.includes?.media.find((media) => media.media_key === key)
                  ) || []; 
              }
              queryTweets.push(tweet);
            }
            
          } else repeatedTweets[tweetText] += 1; 
        });
      return {tweets: queryTweets, metaInfo: metaInfo};
    }
    
    return {tweets: [], metaInfo: {}};
  } catch (error) { 
    console.log(error)
    return {tweets: [], metaInfo: {}};
  }

}
