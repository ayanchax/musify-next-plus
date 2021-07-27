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
import reducer, { initialState } from "../configurations/reducer";

function MyApp({ Component, pageProps }) {
    return (<DataLayer initialState={initialState} reducer={reducer}>
        <Component {...pageProps}
        />;
    </DataLayer>)


}

export default MyApp;