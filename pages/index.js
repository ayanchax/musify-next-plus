import Head from "next/head";
import React, { useState, useEffect } from "react";
import { actionTypes } from "../configurations/reducer";
import { useDataLayerContextValue } from "../configurations/DataLayer";
import { auth } from "../configurations/firebase";
import Login from "../components/Login";
import Header from "../components/Header";
import PlayerLite from "../components/PlayerLite";
import HeaderActions from "../components/HeaderActions";
import Search from "../components/Search";
import Landing from "../components/Landing";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PlaylistContent from "../components/PlaylistContent";
import RegionalContent from "../components/RegionalContent";
import ArtistContent from "../components/ArtistContent";
import BandContent from "../components/BandContent";
import SongContent from "../components/SongContent";
import { BASE } from "../configurations/environments";
export default function Home() {
  const maint_mode = false;
  const app_subtitle = "Enjoy Ad Free Premium Content Music"
  const [currentUrl, setCurrentURL] = useState(BASE);
  const [quote, setQuote] = useState("");
  const [title, setTitle] = useState(app_subtitle);
  const [description, setDescription] = useState(
    "Tired of listening to ads and premium subscriptions while streaming music? Well you might like my new music streaming app #musify in this case. Pls visit " + BASE + " for fresh music content ad free. You just need to sign in using your google credentials and enjoy high quality(320, 640, 1080kbps) ad free music."
  );
  const [image, setImage] = useState(
    BASE + "static/media/logo.6714a076.png"
  );
  const [hashtag, setHashTag] = useState("#musify");

  const [searchSuggestionWindowOpened, setSearchSuggestionWindowOpened] =
    useState(false);

  const [user, dispatch] = useDataLayerContextValue();
  const [mediaObject, setMediaObject] = useState(null);
  const [mediaPaused, setMediaPaused] = useState(false);
  const [mediaFavorite, setMediaFavorite] = useState(false);
  const [_user, setUser] = useState(null);
  const initiateMediaObject = (_mediaObject) => {
    setMediaObject(_mediaObject);
  };

  useEffect(() => {
    //backend listener
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        setUser(authUser);
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      } else {
        //user logged out
        dispatch({
          type: "LOG_OUT",
          user: null,
        });
        setUser(null);
      }
    });
  }, [_user]);
  useEffect(() => {
    if (maint_mode) {
      setTitle("Musify | Maintenance Mode");
    }

  }, []);


  useEffect(() => {

    //setUpMeta(title, description, image, currentUrl);

  }, [title, description, image, currentUrl]);

  const toggleSearchSuggestionWindow = (bool) => {
    setSearchSuggestionWindowOpened(bool);
  };
  const setUpMeta = (_title, _description, _image, _currentUrl) => {

    if (_currentUrl == undefined || _title == undefined || _image == undefined || _description == undefined) {
      return;
    }
    setTitle(_title);
    setDescription(_description);
    setImage(_image);
    setCurrentURL(_currentUrl);
  }

  return (
    <div>
      <Head>
        <title>Musify - {title ? title : app_subtitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="csrf_token" content="" />
        <meta property="type" content="website" />
        <meta property="url" content={currentUrl} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="_token" content="" />
        <meta name="robots" content="noodp" />
        <meta property="title" content={title} />
        <meta property="quote" content={quote} />
        <meta name="description" content={description} />
        <meta property="image" content={image} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:quote" content={quote} />
        <meta property="og:hashtag" content={hashtag} />
        <meta property="og:image" content={image} />
        <meta content="image/*" property="og:image:type" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Musify" />
        <meta property="og:description" content={description} />
        <meta property="fb:app_id" content="874150923308251" />
      </Head>
      {maint_mode ? (
        <div className="text-gray-200 justify-center text-center">
          Site is in maintainence mode.
        </div>
      ) : (
        <div>
          {!_user ? (
            <Login />
          ) : (
            <div className="app">
              <Header />
              <Router>
                <Search
                  isSuggestionOpened={searchSuggestionWindowOpened}
                  toggleSearchSuggestionWindow={toggleSearchSuggestionWindow}
                />
                <HeaderActions />

                <Switch>
                  <Route path="/playlist/:playlistid/:playlistTitle">
                    <PlaylistContent
                      metaCurrentUrl={setCurrentURL}
                      metaTitle={setTitle}
                      metaDescription={setDescription}
                      metaImage={setImage}
                      media={initiateMediaObject}
                      pauseRequested={setMediaPaused}
                      fetchUrl={"playlist?pid="}
                      setSearchSuggestionWindowOpened={
                        setSearchSuggestionWindowOpened
                      }
                      mediaFavorited={setMediaFavorite}
                    />
                  </Route>
                  <Route path="/song/:songid/:songtitle">
                    <SongContent
                      metaCurrentUrl={setCurrentURL}
                      metaTitle={setTitle}
                      metaDescription={setDescription}
                      metaImage={setImage}
                      media={initiateMediaObject}
                      pauseRequested={setMediaPaused}
                      fetchUrl={"song?songid="}
                      setSearchSuggestionWindowOpened={
                        setSearchSuggestionWindowOpened
                      }
                      mediaFavorited={setMediaFavorite}
                    />
                  </Route>
                  <Route path="/artist/:artistid">
                    <ArtistContent
                      isIndian
                      setSearchSuggestionWindowOpened={
                        setSearchSuggestionWindowOpened
                      }
                    />
                  </Route>
                  <Route path="/regional/:regionid">
                    <RegionalContent
                      setSearchSuggestionWindowOpened={
                        setSearchSuggestionWindowOpened
                      }
                    />
                  </Route>
                  <Route path="/band/:bandid">
                    <BandContent
                      isIndian
                      setSearchSuggestionWindowOpened={
                        setSearchSuggestionWindowOpened
                      }
                    />
                  </Route>
                  <Route path="/">
                    {" "}
                    <Landing
                      setSearchSuggestionWindowOpened={
                        setSearchSuggestionWindowOpened
                      }
                    />
                  </Route>
                </Switch>
              </Router>

              <PlayerLite
                setSearchSuggestionWindowOpened={
                  setSearchSuggestionWindowOpened
                }
                media={mediaObject}
                isMediaPaused={mediaPaused}
                isMediaAFavorite={mediaFavorite}
                metaCurrentUrl={setCurrentURL}
                metaTitle={setTitle}
                metaDescription={setDescription}
                metaImage={setImage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}


