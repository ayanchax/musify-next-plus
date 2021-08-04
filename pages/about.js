import Head from 'next/head'
import { useRouter } from "next/router"
function About() {
    const router = useRouter()
    const title = router.query?.title;
    const id = router.query?.id;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>{title ? title : "About Page"}</title>
                <script data-ad-client="ca-pub-7898333112169821" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
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
                <meta property="og:title" content={title ? title : "About Page"} />
                <meta property="og:image" content="" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:type" content="image/*" />
                <meta property="og:url" content="" />
                <meta property="og:site_name" content="SEO Tester" />
                <meta property="og:description" content="SEO Tester About Site for checking meta tags scraping" />



                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="SEO Tester" />
                <meta name="twitter:url" content="" />
                <meta name="twitter:title" content={title ? title : "About Page"} />
                <meta name="twitter:description" content="SEO Tester About Site for checking meta tags scraping" />
                <meta name="twitter:image" content="" />
                <meta name="twitter:image:width" content="1024" />
                <meta name="twitter:image:height" content="512" />
            </Head>

            <h1>About Page Musify</h1>
        </div>
    )
}
export default About