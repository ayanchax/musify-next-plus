import React, { useState, useEffect } from "react";
import Head from 'next/head'
import PlaylistContent from "../components/PlaylistContent"
import { useRouter } from "next/router"
import { SITE_NAME, SITE_HASH, FB_APP_ID } from "../configurations/environments";
import { ASYNC_CALLER_URL } from "../configurations/endpoint";
import parse from "html-react-parser";
import { useDataLayerContextValue } from "../configurations/DataLayer";

function Playlist({ results, media, pauseMedia, favoriteMedia, metaCurrentUrl, metaTitle, metaDescription, metaImage, searchSuggestionWindow }) {
    const router = useRouter()
    const [{ play, currentSongPlaying }, dispatch] = useDataLayerContextValue();
    const playlistTitle = router.query?.playlistTitle;
    const [_title, _setTempTitle] = useState(playlistTitle);

    useEffect(() => {

        if (!play || currentSongPlaying === null) {
            _setTempTitle(playlistTitle)
        }
        else _setTempTitle(currentSongPlaying?.title)
    }, [])
    useEffect(() => {
        searchSuggestionWindow(false)
    }, [results])
    return (
        <div className="playlist__wrapper">
            <Head>
                <title>{_title === playlistTitle ? playlistTitle : `${SITE_NAME} | ${parse(_title)}`}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="csrf_token" content="" />
                <meta property="type" content="website" />
                <meta property="url" content={window.location.href} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="_token" content="" />
                <meta name="robots" content="noodp" />
                <meta property="title" content={_title === playlistTitle ? playlistTitle : `${SITE_NAME} | ${parse(_title)}`} />
                <meta name="description" content={results?.header_desc} />
                <meta property="image" content={results?.image} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={_title === playlistTitle ? playlistTitle : `${SITE_NAME} | ${parse(_title)}`} />
                <meta property="og:image" content={results?.image} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:site_name" content="Musify" />
                <meta property="og:description" content={results?.header_desc} />
                <meta property="og:hashtag" content={SITE_HASH} />
                <meta content="image/*" property="og:image:type" />
                <meta property="fb:app_id" content={FB_APP_ID} />
            </Head>
            <div className="playlist__container">
                {results && (
                    <PlaylistContent
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

export default Playlist

// getServerSideProps is a SSR function in built in next js
// this method is asynchronously called whenever the route is routed to Search
export async function getServerSideProps(context) {
    const data = await fetch(ASYNC_CALLER_URL() + `playlist?pid=${context.query?.playlistid}`).then(response => response.json())
    // After the server has rendered, pass result to client side by wrapping it in inbuilt-key props
    return {
        props: {
            results: data
        }
    }
}