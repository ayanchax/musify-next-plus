import Head from "next/head";
import React, { useState, useEffect } from "react";
import Landing from "../components/Landing";
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
export default function Home({ searchSuggestionWindow }) {
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
        <meta name="csrf_token" content="" />
        <meta property="type" content="website" />
        <meta property="url" content={SITE_HOME_URL} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="_token" content="" />
        <meta name="robots" content="noodp" />
        <meta
          property="title"
          content={
            _title === SITE_TITLE
              ? SITE_TITLE
              : `${SITE_NAME} | ${parse(_title)}`
          }
        />
        <meta name="description" content={SITE_DESC} />
        <meta property="image" content={SITE_IMAGE} />
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
        <meta property="og:url" content={SITE_HOME_URL} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:description" content={SITE_DESC} />
        <meta content="image/*" property="og:image:type" />
        <meta property="fb:app_id" content={FB_APP_ID} />
      </Head>
      <div className="app home">
        <Landing setSearchSuggestionWindowOpened={searchSuggestionWindow} />
      </div>
    </div>
  );
}
