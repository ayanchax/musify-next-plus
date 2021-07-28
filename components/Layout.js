import React, { useState, useEffect } from 'react';
import Header from './Header';
import HeaderActions from './HeaderActions';
import PlayerLite from './PlayerLite';
import Search from './Search';
import { auth } from "../configurations/firebase";
import { useDataLayerContextValue } from "../configurations/DataLayer"
import { actionTypes } from "../configurations/reducer";
import { SITE_TITLE, SITE_DESC, SITE_IMAGE, SITE_HOME_URL } from "../configurations/environments";
import Login from "./Login";
const Layout = ({ children, ...pageProps }) => {

    // user
    const [user, dispatch] = useDataLayerContextValue();
    const [_user, setUser] = useState(null);

    // meta
    const [currentUrl, setCurrentURL] = useState(SITE_HOME_URL);
    const [title, setTitle] = useState(SITE_TITLE);
    const [description, setDescription] = useState(SITE_DESC);
    const [image, setImage] = useState(
        SITE_IMAGE
    );
    // media
    const [mediaObject, setMediaObject] = useState(null);
    const [mediaPaused, setMediaPaused] = useState(false);
    const [mediaFavorite, setMediaFavorite] = useState(false);

    const initiateMediaObject = (_mediaObject) => {
        setMediaObject(_mediaObject);
    };

    // search
    const [searchSuggestionWindowOpened, setSearchSuggestionWindowOpened] =
        useState(false);

    const toggleSearchSuggestionWindow = (bool) => {
        setSearchSuggestionWindowOpened(bool);
    };

    function recursiveMap(children, fn) {
        return React.Children.map(children, child => {
            if (!React.isValidElement(child) || typeof child.type == 'string') {
                return child;
            }

            if (child.props.children) {
                child = React.cloneElement(child, {
                    children: recursiveMap(child.props.children, fn)
                });
            }

            return fn(child);
        });
    }

    // Add props to all child elements.
    const childrenWithProps = recursiveMap(children, child => {
        // Checking isValidElement is the safe way and avoids a TS error too.

        // Pass additional props here
        return React.cloneElement(child, {
            media: setMediaObject, pauseMedia: setMediaPaused, favoriteMedia: setMediaFavorite, metaCurrentUrl: setCurrentURL,
            metaTitle: setTitle, metaDescription: setDescription, metaImage: setImage, searchSuggestionWindow: setSearchSuggestionWindowOpened
        })
    });

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

    if (!_user) {
        return (<Login title="Musify - Sign up" />)
    }

    return (
        <div className="app__layout">
            <Header />
            <Search
                isSuggestionOpened={searchSuggestionWindowOpened}
                toggleSearchSuggestionWindow={toggleSearchSuggestionWindow}
            />
            <HeaderActions />


            {
                React.cloneElement(children, {
                    media: setMediaObject,
                    pauseMedia: setMediaPaused,
                    favoriteMedia: setMediaFavorite,
                    metaCurrentUrl: setCurrentURL,
                    metaTitle: setTitle,
                    metaDescription: setDescription,
                    metaImage: setImage,
                    searchSuggestionWindow: setSearchSuggestionWindowOpened
                })
            }
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
    );
}

export default Layout;

