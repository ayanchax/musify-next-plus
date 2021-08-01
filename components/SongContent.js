/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import { truncate, duration } from "../utils/utility";
import { useDataLayerContextValue } from "../configurations/DataLayer";
import { actionTypes } from "../configurations/reducer";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Popover from "@material-ui/core/Popover";
import parse from "html-react-parser";
import PauseCircleFilledRoundedIcon from "@material-ui/icons/PauseCircleFilledRounded";
import PlayerMoreOptions from "../components/PlayerMoreOptions";
import ShareDialog from "../components/ShareDialog";
import { BASE } from "../configurations/environments"
import { toast } from "react-toastify";
import { useRouter } from "next/router"
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function SongContent({
    playlistSongs,
    setSearchSuggestionWindowOpened, isIndian, media, pauseRequested, mediaFavorited, metaCurrentUrl, metaTitle, metaDescription, metaImage, tempTitle, setPlayerMinimized
}) {
    const router = useRouter()
    const [{ featuredPlaylist }, dispatch] = useDataLayerContextValue();

    const [{ selectedSongNeedle, pause, play, favorited }, dispatch_v2] =
        useDataLayerContextValue();
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);
    const [currentSong, setCurrentSong] = useState({});
    const [needleSelected, setNeedleSelected] = useState(false);
    const [favoriteSong, setFavoriteSong] = useState(false);
    const songObject = useRef(null);
    const [showModal, updateShowModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const playMedia = (song) => {
        tempTitle(song?.title)
        setCurrentSong(song);
        setPlaying(true);
        setPaused(false);
        pauseRequested(false);
        media(song);
    };
    const pauseMedia = (e) => {
        tempTitle(currentSong?.title)
        setPlaying(false);
        setPaused(true);
        pauseRequested(true);
    };
    useEffect(() => {

        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            featuredPlaylist: playlistSongs
        });
        playMedia(playlistSongs);

    }, [playlistSongs]);
    useEffect(() => {
        if (favorited) {
            setFavoriteSong(true)
        }
        else {
            setFavoriteSong(false)
        }

    }, [favorited])
    useEffect(() => {
        if (pause) {
            setPlaying(false);
            setPaused(true);
        }
        if (play) {
            setPlaying(true);
            setPaused(false);
        }
    }, [pause, play]);


    const backHome = (e) => {
        e.preventDefault();
        router.push("/")
        if ((play || pause) && currentSong !== null) {
            setPlayerMinimized(true)
        }
    }

    const OnSongNeedleSelected = (event, playListSong) => {
        if (playListSong != null) {
            dispatch_v2({
                type: actionTypes.SET_SELECTED_SONG_NEEDLE,
                selectedSongNeedle: playListSong,
            });
            setNeedleSelected(true);
        }
    };
    const openMoreOptionsPopOver = (
        event,
        isOpenedFromPlaylist,
        playListSong
    ) => {
        if (isOpenedFromPlaylist && playListSong !== null) {
            dispatch_v2({
                type: actionTypes.SET_SELECTED_SONG_NEEDLE,
                selectedSongNeedle: playListSong,
            });

            setNeedleSelected(true);
        } else {
            setNeedleSelected(false);
        }
        setAnchorEl(event.currentTarget);
    };
    const closeMoreOptionsPopOver = () => {
        setAnchorEl(null);
    };
    const toggleModal = (event, isOpenedFromPlaylist, playListSong) => {
        if (isOpenedFromPlaylist && playListSong !== null) {
            dispatch_v2({
                type: actionTypes.SET_SELECTED_SONG_NEEDLE,
                selectedSongNeedle: playListSong,
            });

            setNeedleSelected(true);
        } else {
            setNeedleSelected(false);
        }
        updateShowModal((state) => !state);
    };

    const toggleFavorites = (e) => {
        e.preventDefault();
        if (!favoriteSong) {
            setFavoriteSong(true);
            mediaFavorited(true)
            toast.dark("Song has been added to your likes", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
        } else {
            setFavoriteSong(false);
            mediaFavorited(false)
            toast.error("Song has been removed from your likes", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
        }

    }
    return (
        playlistSongs && (
            <div
                className="content"
                onClick={(e) => setSearchSuggestionWindowOpened(false)}
            >
                <ShareDialog
                    url={
                        BASE +
                        "song/" +
                        selectedSongNeedle?.id +
                        "/" +
                        selectedSongNeedle?.title
                    }
                    networks={["facebook", "messenger", "whatsapp"]}
                    content={selectedSongNeedle}
                    title="Share"
                    contentTitle={truncate(selectedSongNeedle?.title, 100)}
                    isOpen={showModal}
                    updateModalState={toggleModal}
                />
                <div className="flex  justify-center text-center ">
                    <div className="flex-column">
                        {playlistSongs?.title && (
                            <a href="#" onClick={(e) => backHome(e)} className="flex-start cursor-pointer">
                                <KeyboardBackspaceIcon />
                            </a>
                        )}

                        <div
                            title={playlistSongs?.title}
                            className="lg:text-3xl justify-center text-xl md:text-2xl font-semibold font-serif text-gray-200 px-1 py-1"
                        >
                            <img
                                className=" object-contain  w-80 justify-center text-center"
                                src={playlistSongs?.image}
                            />
                        </div>
                        {playlistSongs?.title && (
                            <div className="flex flex-grow space-x-2 antialiased sm:subpixel-antialiased md:antialiased ">
                                <span className=" transition duration-200 ease-in text-gray-400 cursor-pointer text-lg">
                                    Song
                                </span>

                                <span
                                    title={playlistSongs?.title}
                                    className=" transition duration-200 ease-in text-gray-400 cursor-pointer text-lg "
                                >
                                    &raquo; {truncate(playlistSongs?.title, 30)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify center">
                    <div className="content__playlist center">
                        <div
                            title={playlistSongs?.title ? parse(playlistSongs?.title) : ""}
                            key={playlistSongs?.id}
                            className="justify-center"
                        >
                            <div
                                onClick={(e) => OnSongNeedleSelected(e, playlistSongs)}
                                className={` flex flex-row px-2 py-1  content__playlist__song ${playlistSongs.id === currentSong?.id && playing
                                    ? `active`
                                    : playlistSongs.id === selectedSongNeedle?.id &&
                                        needleSelected
                                        ? `selected`
                                        : ``
                                    }`}
                            >
                                <div
                                    ref={songObject}
                                    className="flex flex-grow space-x-1 align-middle"
                                >
                                    {playlistSongs?.id === currentSong?.id && playing ? (
                                        <div className="flex space-x-1">
                                            <Loader
                                                className="content__playlist__audioLoader"
                                                type="Audio"
                                                color="#ffff"
                                                height={20}
                                                width={20}
                                            />
                                            <PauseCircleFilledRoundedIcon
                                                onClick={(e) => pauseMedia(e)}
                                                className="content__playlist__audioLoader"
                                            />
                                        </div>
                                    ) : (
                                        <PlayCircleFilledRoundedIcon
                                            onClick={(e) =>
                                                playlistSongs?.id === currentSong?.id && playing
                                                    ? pauseMedia(e)
                                                    : playMedia(playlistSongs)
                                            }
                                            className="content__icon"
                                        />
                                    )}

                                    <div className="mt-1">
                                        {truncate(
                                            playlistSongs?.title ? parse(playlistSongs?.title) : "",
                                            30
                                        )}
                                    </div>
                                </div>

                                <div
                                    title={
                                        playlistSongs?.more_info?.primary_artists_label
                                            ? playlistSongs?.more_info?.primary_artists_label
                                            : playlistSongs?.subtitle
                                    }
                                    className="text-gray-500"
                                >
                                    {truncate(
                                        playlistSongs?.more_info?.primary_artists_label
                                            ? playlistSongs?.more_info?.primary_artists_label
                                            : playlistSongs?.subtitle,
                                        25
                                    )}{" "}
                                    | {playlistSongs?.year}
                                </div>
                                <div className="float-right -mt-4">
                                    <AccessTimeIcon
                                        className="text-xs lg:text-xs md:text-xs transition duration-200 ease-in
                                 text-gray-400 cursor-pointer "
                                    />
                                    <span className=" transition duration-200 ease-in text-gray-400 cursor-pointer text-xs lg:text-md md:text-md">
                                        {duration(playlistSongs?.more_info?.duration)}
                                    </span>
                                </div>
                                <div className="flex space-x-2 song__level__actions  align-middle">
                                    <div title="Share"><ShareIcon
                                        onClick={(e) => toggleModal(e, true, playlistSongs)}
                                        className=" transition duration-200 ease-in text-gray-500 cursor-pointer text-xs lg:text-md md:text-md hover:text-gray-100"
                                    />
                                    </div>


                                    <div title="Toggle Favorite">
                                        {!favoriteSong && (
                                            <FavoriteBorderIcon onClick={(e) => toggleFavorites(e, false, null)} className="transition duration-200 ease-in text-gray-500 cursor-pointer text-xs lg:text-md md:text-md hover:text-gray-100" />

                                        )}
                                        {favoriteSong && (

                                            <FavoriteIcon onClick={(e) => toggleFavorites(e, false, null)} className="transition duration-200 ease-in text-gray-500 cursor-pointer text-xs lg:text-md md:text-md hover:text-gray-100" />

                                        )}
                                    </div>


                                    <div title="More"><MoreHorizIcon
                                        onClick={(e) =>
                                            openMoreOptionsPopOver(e, true, playlistSongs)
                                        }
                                        className=" transition duration-200 ease-in text-gray-500 cursor-pointer text-xs lg:text-md md:text-md hover:text-gray-100"
                                    />
                                    </div>

                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={closeMoreOptionsPopOver}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                    >
                                        <PlayerMoreOptions
                                            openedFromPlaylist={true}
                                            onClosed={closeMoreOptionsPopOver}
                                        />
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default SongContent;
