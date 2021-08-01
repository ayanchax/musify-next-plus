import Head from "next/head";
import React, { useState, useEffect } from "react";
import Landing from "../components/Landing";
import { truncate } from "../utils/utility"
import { ASYNC_CALLER_URL } from "../configurations/endpoint";
import {
  SITE_NAME,
  SITE_TITLE,
  SITE_DESC,
  SITE_IMAGE,
  SITE_HOME_URL,
  SITE_HASH,
  FB_APP_ID,
} from "../configurations/environments";
import { useDataLayerContextValue } from "../configurations/DataLayer";
import parse from "html-react-parser";
import { categories } from "../configurations/requests";
import cache from "memory-cache";

export default function Home({ boilerPlate, indianCategory, westernPopularCategory, westernRockCategory, moodCategory, searchSuggestionWindow }) {

  const [{ play, currentSongPlaying }, dispatch] = useDataLayerContextValue();
  const [_title, _setTempTitle] = useState(SITE_TITLE);
  useEffect(() => {
    if (!play || currentSongPlaying === null) {
      _setTempTitle(SITE_TITLE);
    } else _setTempTitle(currentSongPlaying?.title);
  }, [_title]);
  return (
    <div>
      <Head>
        <title>
          {_title === SITE_TITLE
            ? SITE_TITLE
            : `${SITE_NAME} | ${parse(_title)}`}
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="csrf_token" content="" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="_token" content="" />
        <meta name="robots" content="noodp" />

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={
            _title === SITE_TITLE
              ? SITE_TITLE
              : `${SITE_NAME} | ${parse(_title)}`
          }
        />
        <meta property="og:hashtag" content={SITE_HASH} />
        <meta property="og:image" content={SITE_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta content="image/*" property="og:image:type" />
        <meta property="og:url" content={SITE_HOME_URL} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:description" content={SITE_DESC} />

        <meta property="fb:app_id" content={FB_APP_ID} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={SITE_NAME} />
        <meta name="twitter:url" content={window.location.href} />
        <meta name="twitter:title" content={_title === SITE_TITLE
          ? SITE_TITLE
          : `${SITE_NAME} | ${parse(_title)}`} />
        <meta name="twitter:description" content={truncate(SITE_DESC, 100)} />
        <meta name="twitter:image" content={SITE_IMAGE} />
        <meta name="twitter:image:width" content="1024" />
        <meta name="twitter:image:height" content="512" />
      </Head>
      <div className="app home">
        <Landing boilerPlateResults={boilerPlate}
          indianCategory={indianCategory}
          westernPopularCategory={westernPopularCategory}
          westernRockCategory={westernRockCategory}
          moodCategory={moodCategory}
          setSearchSuggestionWindowOpened={searchSuggestionWindow} />
      </div>
    </div>
  );
}

// getServerSideProps is a SSR function in built in next js
// this method is asynchronously called whenever the route is routed to Search
export async function getServerSideProps(context) {

  const cachedFetch = async (url) => {
    const cachedResponse = cache.get(url);
    if (cachedResponse) {
      console.log("Cached")
      return cachedResponse;
    } else {
      console.log("New")
      const hours = 2;
      const response = await fetch(url);
      const data = await response.json();
      cache.put(url, data, hours * 1000 * 60 * 60);
      return data;
    }
  };
  const categoriesData = categories;
  const categoryMap = {
    INDIAN: categoriesData[0].INDIAN,
    WESTERN: categoriesData[0].WESTERN,
    MOOD: categoriesData[0].MOOD,
  };

  let indianCategoryPromise = []
  let _indianCategoryData = categoryMap?.INDIAN?.map(async (category) => {
    const res = await cachedFetch(ASYNC_CALLER_URL() + category?.url)
    indianCategoryPromise = { key: category.title, value: res };
    return indianCategoryPromise

  });

  let westernRockCategoryPromise = []
  let _westernRockCategoryData = categoryMap?.WESTERN[0]?.ROCK.map(async (category) => {
    const res = await cachedFetch(ASYNC_CALLER_URL() + category?.url)
    westernRockCategoryPromise = { key: category.title, value: res };
    return westernRockCategoryPromise

  });

  let westernPopularCategoryPromise = []
  let _westernPopularCategoryData = categoryMap?.WESTERN[1]?.OTHERS.map(async (category) => {
    const res = await cachedFetch(ASYNC_CALLER_URL() + category?.url)
    westernPopularCategoryPromise = { key: category.title, value: res };
    return westernPopularCategoryPromise

  });

  let moodPromise = []
  let _moodCategoryData = categoryMap?.MOOD?.map(async (category) => {
    const res = await cachedFetch(ASYNC_CALLER_URL() + category?.url)
    moodPromise = { key: category.title, value: res };
    return moodPromise

  });

  //playlist categories.
  const indianCategory = await Promise.all(_indianCategoryData);
  const westernPopularCategory = await Promise.all(_westernPopularCategoryData);
  const westernRockCategory = await Promise.all(_westernRockCategoryData);
  const moodCategory = await Promise.all(_moodCategoryData);

  //bands artists regional
  const data = await fetch(
    ASYNC_CALLER_URL() + `boilerplate`
  ).then((response) => response.json());
  // After the server has rendered, pass result to client side by wrapping it in inbuilt-key props
  return {
    props: {
      boilerPlate: data,
      indianCategory: indianCategory,
      westernPopularCategory: westernPopularCategory,
      westernRockCategory: westernRockCategory,
      moodCategory: moodCategory,
    },
  };
}
