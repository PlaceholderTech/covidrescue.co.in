import Tweet from '@/components/Tweet';
import { getTweets, getTweetsBasedOnCrieteria } from '@/lib/twitter';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

import Link from 'next/link';
import { useRouter } from 'next/router';
import SideNavbar from '@/components/SideNavbar';
import MobileMenu from '@/components/MobileMenu';

export async function getServerSideProps({ params, query }) {
  // const tweets = await getTweets(["1386967279322247180"]);
  const { tweets, metaInfo } = await getTweetsBasedOnCrieteria(
    params.location,
    params.resource,
    query.p
  );
  if (!tweets) {
    return {
      notFound: true,
    };
  }

  return {
    props: { tweets, metaInfo }, // will be passed to the page component as props
  };
}

export default function LocationAndResource({ tweets, metaInfo }) {
  const router = useRouter();

  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedTweets, setTweets] = useState(tweets);
  const [nextToken, setNextToken] = useState(
    metaInfo?.next_token ? metaInfo.next_token : null
  );

  const location = router.query.location;
  const resource = router.query.resource;

  useEffect(() => {
    setTweets(tweets);
    setNextToken(metaInfo?.next_token ? metaInfo.next_token : null);
  }, [tweets]);

  const loadMoreTweets = async () => {
    if (nextToken) {
      setLoadingMore(true);
      const preparedRequestObject = {
        nextToken: nextToken,
        location: location,
        resource: resource,
        preference: router.query.p,
      };
      const responseData = await fetch('/api/twitter', {
        method: 'post',
        body: JSON.stringify(preparedRequestObject),
      });

      const parsedResponse = await responseData.json();

      if (parsedResponse?.tweets) {
        setTweets([...loadedTweets, ...parsedResponse?.tweets]);
      }

      setNextToken(
        parsedResponse?.metaInfo?.next_token
          ? parsedResponse?.metaInfo?.next_token
          : null
      );
      setLoadingMore(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Covid Dashboard India</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-2 md:grid md:relative md:grid-cols-4">
        <SideNavbar />
        <div className="main-box md:col-span-3">
          <main className="container max-w-4xl mx-auto">
            <MobileMenu />
            <h1 className="mt-4 text-xl">
              Showing results for:{' '}
              <span className="font-bold text-indigo-500">
                {resource} required in {location}
              </span>
            </h1>
            <hr className="mt-4" />
            {loadedTweets.map((tweet) => (
              <Tweet key={tweet.id} {...tweet} />
            ))}

            {nextToken && (
              <div className="flex justify-center pb-12">
                <button
                  disabled={loadingMore}
                  onClick={loadMoreTweets}
                  className="flex px-4 py-2 font-semibold text-gray-800 bg-white border border-gray-400 rounded shadow hover:bg-gray-100"
                >
                  Load more <Loader show={loadingMore} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
