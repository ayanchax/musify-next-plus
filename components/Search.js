import React, { useState } from "react";

import axios from "../configurations/axios";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import AutoSuggest from "../components/AutoSuggest";

function Search({ isSuggestionOpened, toggleSearchSuggestionWindow }) {
    const [songSuggestions, setSongSuggestions] = useState([]);
    const [playlistsSuggestions, setPlaylistsSuggestions] = useState([]);
    const [albumsSuggestion, setAlbumsSuggestion] = useState([]);
    const [topArtistsSuggestions, setTopArtistsSuggestions] = useState([]);
    const [searchText, setSearchText] = useState("");
    const search = (e) => {
        e.preventDefault();
        if (searchText.length === 0 || searchText.length < 5) {
            toggleSearchSuggestionWindow(false);
            setSongSuggestions([]);
            setPlaylistsSuggestions([]);
            setAlbumsSuggestion([]);
            setTopArtistsSuggestions([]);
            return;
        }
        getAsyncSuggestion(e);
    };
    const pollForCachedResults = (e) => {
        if (searchText.length === 0 || searchText.length < 5) {
            toggleSearchSuggestionWindow(false);
            setSongSuggestions([]);
            setPlaylistsSuggestions([]);
            setAlbumsSuggestion([]);
            setTopArtistsSuggestions([]);
            return;
        }
        toggleSearchSuggestionWindow(true);
    };
    const getAsyncSuggestion = async (e) => {
        if (searchText.length === 0 || searchText.length < 5) {
            toggleSearchSuggestionWindow(false);
            setSongSuggestions([]);
            setPlaylistsSuggestions([]);
            setAlbumsSuggestion([]);
            setTopArtistsSuggestions([]);
            return;
        }
        await axios
            .get("search?query=" + searchText)
            .then((response) => {

                setSongSuggestions(response.data?.songs);
                setPlaylistsSuggestions(response.data?.playlists);
                setAlbumsSuggestion(response.data?.albums);
                setTopArtistsSuggestions(response.data.artists);
                toggleSearchSuggestionWindow(true);
            })
            .catch((error) => {
                toggleSearchSuggestionWindow(false);
                console.error("Failed!", error);
            });
    };

    return (
        <div className="justify-center text-gray-200">
            <form onSubmit={(e) => search(e)} className="flex flex-grow mt-12 ">
                <SearchIcon className="text-gray-400 mt-1" />
                <TextField
                    fullWidth={true}
                    value={searchText}
                    className="search__input"
                    onClick={(e) => pollForCachedResults(e)}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyUp={(e) => getAsyncSuggestion(e)}
                    placeholder="Search by music, artist, playlists.."
                />
                <button type="submit">Send Message</button>
            </form>
            {isSuggestionOpened && (
                <AutoSuggest
                    songSuggestions={songSuggestions}
                    playlistsSuggestions={playlistsSuggestions}
                    albumsSuggestion={albumsSuggestion}
                    topArtistsSuggestions={topArtistsSuggestions}
                />
            )}
        </div>
    );
}

export default Search;
