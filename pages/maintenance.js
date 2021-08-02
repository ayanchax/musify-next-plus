import React from 'react'
import Head from "next/head";
import { SITE_NAME, SITE_DESC, SITE_IMAGE, SITE_HOME_URL, SITE_HASH, FB_APP_ID, MAINT_TITLE, MAINT_MESSAGE } from "../configurations/environments";
function Maintenance() {

    return (
        <div className="text-center flex w-full px-20 py-20 justify-center text-black">
            <Head>
                <title>{MAINT_TITLE}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="csrf_token" content="" />
                <meta property="type" content="website" />
                <meta property="url" content={SITE_HOME_URL} />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="_token" content="" />
                <meta name="robots" content="noodp" />
                <meta property="title" content={`${SITE_NAME} | Maintenance`} />
                <meta name="description" content={SITE_DESC} />
                <meta property="image" content={SITE_IMAGE} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`${SITE_NAME} | Maintenance`} />
                <meta property="og:hashtag" content={SITE_HASH} />
                <meta property="og:image" content={SITE_IMAGE} />
                <meta property="og:url" content={SITE_HOME_URL} />
                <meta property="og:site_name" content={SITE_NAME} />
                <meta property="og:description" content={SITE_DESC} />
                <meta content="image/*" property="og:image:type" />
                <meta property="fb:app_id" content={FB_APP_ID} />

            </Head>
            {MAINT_MESSAGE}
        </div>
    )
}

export default Maintenance
