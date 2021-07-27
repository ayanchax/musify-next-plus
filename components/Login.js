import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { auth, googleAuthProvider } from "../configurations/firebase";
import { actionTypes } from "../configurations/reducer";
import { useDataLayerContextValue } from "../configurations/DataLayer";
toast.configure();

function Login() {
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