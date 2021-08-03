import React, { useState, useEffect } from 'react';
import Header from './Header';
import HeaderActions from './HeaderActions';
import PlayerLite from './PlayerLite';
import Search from './Search';
import { SITE_TITLE, SITE_DESC, SITE_IMAGE, SITE_HOME_URL } from "../configurations/environments";

const Layout = ({ children, ...pageProps }) => {
     // meta
    const [currentUrl, setCurrentURL] = useState(SITE_HOME_URL);
    const [title, setTitle] = useState(SITE_TITLE);
    const [description, setDescription] = useState(SITE_DESC);
    const [image, setImage] = useState(SITE_IMAGE);
    // media
    const [mediaObject, setMediaObject] = useState(null);
    const [mediaPaused, setMediaPaused] = useState(false);
    const [mediaFavorite, setMediaFavorite] = useState(false);
    const [playerMinimized, setPlayerMinimized] = useState(false)

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
    return (
        <div className="app__layout authorized secured tls3 musify-window">
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
                    searchSuggestionWindow: setSearchSuggestionWindowOpened,
                    setPlayerMinimized: setPlayerMinimized
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
                playerMinimized={playerMinimized}
            />

        </div>
    );
}

export default Layout;

