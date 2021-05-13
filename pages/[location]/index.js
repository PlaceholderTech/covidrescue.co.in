import Tweet from "@/components/Tweet";
import { getTweets, getTweetsBasedOnCrieteria } from "@/lib/twitter";
import Head from "next/head";
import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import SideNavbar from "@/components/SideNavbar";
import Loader from "@/components/Loader";
import resources from "@/data/resources";
import MobileMenu from "@/components/MobileMenu";

export async function getServerSideProps({ params, query }) {
  // const tweets = await getTweets(["1386967279322247180"]);

  const { tweets, metaInfo } = await getTweetsBasedOnCrieteria(
    params.location,
    null,
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

export default function Location({ tweets, metaInfo }) {
  const router = useRouter();

  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedTweets, setTweets] = useState(tweets);
  const [nextToken, setNextToken] = useState(
    metaInfo?.next_token ? metaInfo.next_token : null
  );

  const location = router.query.location;

  useEffect(() => {}, [loadedTweets]);

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
        resource: null,
        preference: router.query.p,
      };
      const responseData = await fetch("/api/twitter", {
        method: "post",
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
      <div className="md:grid md:relative md:grid-cols-4 mx-2">
        <SideNavbar />
        <div className="main-box md:col-span-3">
          <main className="container mx-auto max-w-4xl">
            <MobileMenu />
            <h1 className="text-xl mt-4">
              Showing results for:{" "}
              <span className="font-bold text-indigo-500">
                All Resources required in {location}
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
                  className="flex bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
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
