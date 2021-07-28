import React from 'react'
import Head from "next/head";
function Maintenance({ message, title }) {
    return (
        <div className="text-center flex w-full px-20 py-20 justify-center text-black">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="csrf_token" content="" />
                <meta property="type" content="website" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Head>
            {message}
        </div>
    )
}

export default Maintenance
