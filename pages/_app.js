import "../styles/globals.css";
import "../components/App.css";
import "../components/Header.css";
import "../components/Login.css";
import "../components/PlayerMoreOptions.css";
import "../components/Player.css";
import "../components/GenericDialog.css";
import "../components/Footer.css";
import "../components/ShareDialog.css"
import "../components/SongCredit.css"
import "../components/PlaylistContent.css";
import "../components/Search.css";
import "../components/AutoSuggest.css";
import "../components/HeaderOption.css";
import "../components/Row.css";
import { DataLayer } from "../configurations/DataLayer"
import { useEffect, useState } from "react"
import reducer, { initialState } from "../configurations/reducer";
import Layout from "../components/Layout";
import { UNDER_MAINT } from "../configurations/environments";
import Maintenance from "../components/Maintenance";
import Login from "../components/Login";
import { auth } from "../configurations/firebase";

function MyApp({ Component, pageProps }) {
    const [userLoggedin, setUserLoggedIn] = useState(null);
    useEffect(() => {
        //backend listener
        checkAuth();
    }, [userLoggedin]);
    const checkAuth = () => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user logged in
                setUserLoggedIn(authUser);

            } else {
                setUserLoggedIn(null);
            }
        });
    }
    return (
        <DataLayer initialState={initialState} reducer={reducer}>
            {UNDER_MAINT ? (<Maintenance />) : !userLoggedin ? (<Login />) : (
                //    Main Auth Layout
                <Layout authorizedUser={userLoggedin}>
                    <Component {...pageProps} />
                </Layout>
            )}
        </DataLayer>)
}
export default MyApp;

