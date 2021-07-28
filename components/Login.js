import React from "react";
import Head from "next/head";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { auth, googleAuthProvider } from "../configurations/firebase";
import { actionTypes } from "../configurations/reducer";
import { useDataLayerContextValue } from "../configurations/DataLayer";
import { SITE_NAME, SITE_TITLE, SITE_DESC, SITE_IMAGE, SITE_HOME_URL, SITE_HASH, FB_APP_ID } from "../configurations/environments";
toast.configure();

function Login({ title }) {
    const [{ }, dispatch] = useDataLayerContextValue();

    const signIn = () => {

        auth
            .signInWithPopup(googleAuthProvider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
                toast.dark("You are now signed in!!", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                });
            }
            )
            .catch((error) => {
                console.log(error)
                toast.error("Some error occured during signing in", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                });
            });
    };
    return (<div className="login">
        <Head>
            <title>{title ? title : SITE_TITLE}</title>
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
            <meta property="title" content={SITE_TITLE} />
            <meta name="description" content={SITE_DESC} />
            <meta property="image" content={SITE_IMAGE} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={SITE_TITLE} />
            <meta property="og:hashtag" content={SITE_HASH} />
            <meta property="og:image" content={SITE_IMAGE} />
            <meta property="og:url" content={SITE_HOME_URL} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:description" content={SITE_DESC} />
            <meta content="image/*" property="og:image:type" />
            <meta property="fb:app_id" content={FB_APP_ID} />
        </Head>
        <div className="login__container">
            <div className=" justify-center text-center flex  ">
                <Loader
                    className="content__audio_loader"
                    type="Audio"
                    color="#00BFFF"
                    height={40}
                    width={40}
                />
            </div>

            <div className=" justify-center flex ">
                <img className=" px-2 py-2 object-contain w-48"
                    src="/logo.png"
                    alt=""
                />
            </div>

            <div className=" justify-center flex">
                <img onClick={signIn} className="w-36 object-contain cursor-pointer justify-center text-center  place-content-center"
                    src="/images/buttons/g-sign.png"
                    alt=""
                />
            </div>
        </div>
    </div>
    );
}

export default Login;