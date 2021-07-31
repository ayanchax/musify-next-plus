import React, { useState, useEffect } from "react";
import Head from 'next/head'
import SongContent from "../components/SongContent"
import { useRouter } from "next/router"
import { SITE_NAME, SITE_HASH, FB_APP_ID } from "../configurations/environments";
import { ASYNC_CALLER_URL } from "../configurations/endpoint";
import parse from "html-react-parser";
import { useDataLayerContextValue } from "../configurations/DataLayer";
import { truncate } from "../utils/utility"
function Song({ results, media, pauseMedia, favoriteMedia, metaCurrentUrl, metaTitle, metaDescription, metaImage, searchSuggestionWindow }) {
    const router = useRouter()
    const [{ play, currentSongPlaying }, dispatch] = useDataLayerContextValue();
    const songTitle = router.query?.songTitle;
    const songid = router.query?.songid;
    const [_title, _setTempTitle] = useState(songTitle);
    useEffect(() => {
        if (!play || currentSongPlaying === null) {
            _setTempTitle(songTitle)
        }
        else _setTempTitle(currentSongPlaying?.title)
    }, [])
    useEffect(() => {
        searchSuggestionWindow(false)
    }, [results])

    return (
        <div className="playlist__wrapper">
            <Head>
                <title>{_title === songTitle ? songTitle : `${SITE_NAME} | ${parse(_title)}`}</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href={`https://musify-plus.vercel.app/song?songid=${songid}&songTitle=${songTitle}`} />
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
                <meta property="og:image" content={results?.image} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta content="image/*" property="og:image:type" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={_title === songTitle ? songTitle : `${SITE_NAME} | ${parse(_title)}`} />
                <meta property="og:url" content={`https://musify-plus.vercel.app/song?songid=${songid}&songTitle=${songTitle}`} />
                <meta property="og:site_name" content={SITE_NAME} />
                <meta property="og:description" content={results?.subtitle} />
                <meta property="og:hashtag" content={SITE_HASH} />
                <meta property="fb:app_id" content={FB_APP_ID} />


                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content={SITE_NAME} />
                <meta name="twitter:url" content={`https://musify-plus.vercel.app/song?songid=${songid}&songTitle=${songTitle}`} />
                <meta name="twitter:title" content={_title === songTitle ? songTitle : `${SITE_NAME} | ${parse(_title)}`} />
                <meta name="twitter:description" content={truncate(results?.subtitle, 100)} />
                <meta name="twitter:image" content={results?.image} />
                <meta name="twitter:image:width" content="1024" />
                <meta name="twitter:image:height" content="512" />

            </Head>
            <div className="playlist__container">
                {results && (
                    <SongContent
                        playlistSongs={results}
                        setSearchSuggestionWindowOpened={searchSuggestionWindow}
                        media={media}
                        pauseRequested={pauseMedia}
                        mediaFavorited={favoriteMedia}
                        metaCurrentUrl={metaCurrentUrl} metaTitle={metaTitle} metaDescription={metaDescription} metaImage={metaImage}
                        tempTitle={_setTempTitle}
                    />)}
            </div>
        </div>


    )
}

export default Song

// getServerSideProps is a SSR function in built in next js
// this method is asynchronously called whenever the route is routed to Search
export async function getServerSideProps(context) {
    const data = await fetch(ASYNC_CALLER_URL() + `song?songid=${context.query?.songid}`).then(response => response.json())
    // After the server has rendered, pass result to client side by wrapping it in inbuilt-key props
    return {
        props: {
            results: data
        }
    }
}