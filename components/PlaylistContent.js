import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { truncate, duration, formatted_duration } from "../utils/utility"
import { useDataLayerContextValue } from "../configurations/DataLayer";
import { actionTypes } from "../configurations/reducer";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Popover from "@material-ui/core/Popover";
import parse from "html-react-parser"
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import PlayerMoreOptions from "./PlayerMoreOptions";
import ShareDialog from "./ShareDialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlaylistShareDialog from "./PlaylistShareDialog";
import PlayerListMoreOptions from "./PlaylistMoreOptions";
import { BASE } from "../configurations/environments"
import { useRouter } from "next/router"


toast.configure();

function PlaylistContent({ playlistSongs, setSearchSuggestionWindowOpened, isIndian, media, pauseRequested, mediaFavorited, metaCurrentUrl, metaTitle, metaDescription, metaImage, tempTitle }) {
    const router = useRouter()
    const [{ selectedSongNeedle, favoriteSongsInPlaylist, pause, play, favorited }, dispatch_v2] = useDataLayerContextValue();
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);
    const [currentSong, setCurrentSong] = useState({});
    const [needleSelected, setNeedleSelected] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [playListFavorite, setPlaylistFavorite] = useState(false);
    const [favoriteSongs, setFavoriteSongs] = useState([]);
    const [showModal, updateShowModal] = useState(false);
    const [showPlaylistModal, updateShowPlaylistModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElPlaylist, setAnchorElPlaylist] = useState(null);
    const open = Boolean(anchorEl);
    const openPlaylist = Boolean(anchorElPlaylist);
    const id = open ? "simple-popover" : undefined;
    const playlist_popover_id = openPlaylist ? "simple-popover" : undefined;


    useEffect(() => {
        dispatch_v2({
            type: actionTypes.SET_FEATURED_PLAYLISTS,
            featuredPlaylist: playlistSongs,
        })
    }, [playlistSongs]);
    const playMedia = (song) => {
        tempTitle(song?.title)
        setCurrentSong(song)
        setPlaying(true);
        setPaused(false);
        pauseRequested(false)
        media(song)
        if (favoriteSongs.includes(song)) {
            mediaFavorited(true)
        }
        else mediaFavorited(false)

    }
    const pauseMedia = (e) => {
        tempTitle(currentSong?.title)
        setPlaying(false);
        setPaused(true);
        pauseRequested(true)
    }
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

    useEffect(() => {

        if (favorited) {
            setFavorite(true)
            setFavoriteSongs([...favoriteSongs, currentSong]);
        }
        else {
            setFavorite(false)
            setFavoriteSongs(favoriteSongs.filter(item => item.id !== currentSong.id));

        }
        dispatch_v2({
            type: actionTypes.SET_FAVORITE_SONGS_IN_PLAYLIST,
            favoriteSongsInPlaylist: favoriteSongs
        });
    }, [favorited])

    const OnSongNeedleSelected = (event, playListSong) => {
        if (playListSong != null) {
            dispatch_v2({
                type: actionTypes.SET_SELECTED_SONG_NEEDLE,
                selectedSongNeedle: playListSong,
            });
            setNeedleSelected(true);
        }

    }
    const openMoreOptionsPopOver = (event, isOpenedFromPlaylist, playListSong) => {
        if (isOpenedFromPlaylist && playListSong !== null) {
            dispatch_v2({
                type: actionTypes.SET_SELECTED_SONG_NEEDLE,
                selectedSongNeedle: playListSong,
            });

            setNeedleSelected(true);
        }
        else {
            setNeedleSelected(false);
        }
        setAnchorEl(event.currentTarget);
    };

    const openMoreOptionsPlaylistPopOver = (event) => {
        setAnchorElPlaylist(event.currentTarget);
    };
    const closeMoreOptionsPopOver = () => {
        setAnchorEl(null);
    };
    const closePlaylistMoreOptionsPopOver = () => {
        setAnchorElPlaylist(null)
    };
    const toggleModal = (event, isOpenedFromPlaylist, playListSong) => {
        if (isOpenedFromPlaylist && playListSong !== null) {
            dispatch_v2({
                type: actionTypes.SET_SELECTED_SONG_NEEDLE,
                selectedSongNeedle: playListSong,
            });

            setNeedleSelected(true);
        }
        else {
            setNeedleSelected(false);
        }
        updateShowModal((state) => !state);

    }
    const togglePlaylistModal = (event) => {
        updateShowPlaylistModal((state) => !state)

    }
    const toggleFavorites = (e, isOpenedFromPlaylist, playListSong) => {
        e.preventDefault();
        if (isOpenedFromPlaylist && playListSong !== null) {
            manageFavorites(playListSong);
        }
        else {
            togglePlaylistFavorite();

        }
    }
    const togglePlaylistFavorite = () => {
        if (!playListFavorite) {
            setPlaylistFavorite(true);
            toast.dark("Playlist has been added to your likes", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
        } else {
            setPlaylistFavorite(false);
            toast.error("Playlist has been removed from your likes", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
        }
    }

    const manageFavorites = (playListSong) => {
        dispatch_v2({
            type: actionTypes.SET_SELECTED_SONG_NEEDLE,
            selectedSongNeedle: playListSong,
        });
        try {
            let indexToRemove = -1;
            favoriteSongs.forEach((_song, index) => {
                if (_song?.id === playListSong.id) {
                    // remove from favorites list if its already
                    indexToRemove = index;
                }
            });
            if (indexToRemove >= 0) {
                setFavoriteSongs(favoriteSongs.filter(item => item.id !== playListSong.id));
                setFavorite(false);
                if (currentSong.id === playListSong.id) {
                    mediaFavorited(false)
                }

                toast.error("Song has been removed from your likes", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                });

            }
            else {
                setFavorite(true);
                setFavoriteSongs([...favoriteSongs, playListSong]);

                if (currentSong.id === playListSong.id) {
                    mediaFavorited(true)
                }
                toast.dark("Song has been added to your likes", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                });


            }

            dispatch_v2({
                type: actionTypes.SET_FAVORITE_SONGS_IN_PLAYLIST,
                favoriteSongsInPlaylist: favoriteSongs
            });


        } catch (error) {
        }
    }

    const backHome = (e) => {
        e.preventDefault();
        router.push("/")

    }
    return playlistSongs && (<div className="content" onClick={(e) => setSearchSuggestionWindowOpened(false)}>

        <ShareDialog
            url={BASE + "song?songid=" + selectedSongNeedle?.id + "&songTitle=" + selectedSongNeedle?.title}
            networks={[
                "facebook",
                "messenger",
                "whatsapp",

            ]}
            content={selectedSongNeedle}
            title="Share"
            contentTitle={truncate(
                selectedSongNeedle?.title,
                100
            )}
            isOpen={showModal}
            metaCurrentUrl={metaCurrentUrl}
            metaTitle={metaTitle}
            metaDescription={metaDescription}
            metaImage={metaImage}
            updateModalState={toggleModal}
            uniqueToken={showModal ? uuidv4() : ""}
        />
        <PlaylistShareDialog
            url={window.location.href}
            networks={[
                "facebook",
                "messenger",
                "whatsapp"
            ]}
            content={playlistSongs}
            title="Share"
            contentTitle={truncate(
                playlistSongs?.title,
                100
            )}
            isOpen={showPlaylistModal}
            metaCurrentUrl={metaCurrentUrl}
            metaTitle={metaTitle}
            metaDescription={metaDescription}
            metaImage={metaImage}
            updateModalState={togglePlaylistModal}
            uniqueToken={showPlaylistModal ? uuidv4() : ""}
        />
        <div className="flex  justify-center text-center ">
            <div className="flex-column">
                {playlistSongs?.title && (<a onClick={(e) => backHome(e)} href="#" className="flex-start cursor-pointer"><KeyboardBackspaceIcon /></a>)}
                <div title={playlistSongs?.title} className="text-xl  font-semibold font-serif
                 text-gray-200 px-2 py-2 antialiased sm:subpixel-antialiased md:antialiased flex  ">

                    {/* {playlistSongs?.title && (<MusicNoteIcon className="content__headerIcon" />)} */}
                    <h1 title={playlistSongs?.title} >{truncate(playlistSongs?.title, 26)}</h1>
                </div>

                <div title={playlistSongs?.title} className="lg:text-3xl justify-center text-xl md:text-2xl font-semibold font-serif text-gray-200 px-1 py-1">
                    <img className=" object-contain w-64 lg:w-64 justify-center text-center" src={playlistSongs?.image} alt={playlistSongs?.title} />
                </div>
                {playlistSongs?.title && (
                    <div className="flex flex-grow space-x-2 antialiased sm:subpixel-antialiased md:antialiased ">
                        <span className=" transition duration-200 ease-in font-semibold text-gray-500 cursor-pointer text-md lg:text-md md:text-md  antialiased sm:subpixel-antialiased md:antialiased">
                            Playlist &raquo;
                        </span>
                        <div title="Share"><ShareIcon onClick={(e) => togglePlaylistModal(e)} className=" transition duration-200 ease-in text-gray-500 cursor-pointer  lg:text-md md:text-md hover:text-gray-100" />
                        </div>

                        <div title="Toggle Favorite">
                            {!playListFavorite && (
                                <FavoriteBorderIcon onClick={(e) => toggleFavorites(e, false, null)} className="transition duration-200 ease-in text-gray-500 cursor-pointer  lg:text-md md:text-md hover:text-gray-100" />

                            )}
                            {playListFavorite && (

                                <FavoriteIcon onClick={(e) => toggleFavorites(e, false, null)} className="transition duration-200 ease-in text-gray-500 cursor-pointer  lg:text-md md:text-md hover:text-gray-100" />

                            )}
                        </div>
                        <div title="More">
                            <MoreHorizIcon onClick={(e) => openMoreOptionsPlaylistPopOver(e)} className="transition duration-200 ease-in text-gray-500 cursor-pointer  lg:text-md md:text-md hover:text-gray-100" />
                        </div>
                        <Popover
                            id={playlist_popover_id}
                            open={openPlaylist}
                            anchorEl={anchorElPlaylist}
                            onClose={closePlaylistMoreOptionsPopOver}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <PlayerListMoreOptions onClosed={closePlaylistMoreOptionsPopOver} />

                        </Popover>

                        <span className="transition duration-200 ease-in font-semibold text-gray-500 cursor-pointer text-md lg:text-md md:text-md hover:text-gray-100 antialiased sm:subpixel-antialiased md:antialiased">{playlistSongs?.list_count} songs</span>
                    </div>
                )}
                {playlistSongs?.title && (
                    <div className="flex flex-grow space-x-2  mt-2">
                        <button className="bg-blue-500 hover:bg-red-700 hover:shadow-md text-white  font-semibold focus:outline-none 
                    mr-1 mb-1 ease-linear transition-all duration-150 py-2 px-4 rounded shadow text-md lg:text-lg font-sans">
                            <PlayCircleFilledRoundedIcon className="content__icon" /> Play All
                        </button>
                        <div title="Total Duration" className=" align-middle mt-3">
                            <AccessTimeIcon className="text-xs lg:text-xs md:text-xs transition duration-200 ease-in
                                 text-gray-400 cursor-pointer " />
                            <span className=" transition duration-200 ease-in text-gray-400 cursor-pointer text-xs lg:text-md md:text-md">
                                {formatted_duration(playlistSongs?.totalDurationOfSongs)}

                            </span>

                        </div>
                    </div>)}

            </div>
        </div>

        <div className="flex justify center">
            <div className="content__playlist center">
                {playlistSongs?.list?.map((song, index) => (
                    <div title={parse(song?.title)} key={song?.id} className="justify-center">

                        <div onClick={(e) => OnSongNeedleSelected(e, song)}
                            className={` flex flex-row px-2 py-1  content__playlist__song ${song.id === currentSong?.id &&
                                playing
                                ? `active`
                                : song.id === selectedSongNeedle?.id && needleSelected ? `selected` : ``
                                }`}
                        >
                            <div className="flex flex-grow space-x-1 align-middle">
                                {song?.id === currentSong?.id &&

                                    playing ? (
                                    <div className="flex space-x-1">
                                        <Loader
                                            className="content__playlist__audioLoader"
                                            type="Audio"
                                            color="#ffff"
                                            height={20}
                                            width={20}
                                        />
                                        <PauseCircleFilledRoundedIcon onClick={(e) => pauseMedia(e)} className="content__playlist__audioLoader" />
                                    </div>
                                ) : (
                                    <PlayCircleFilledRoundedIcon onClick={(e) =>
                                        song?.id === currentSong?.id &&
                                            playing
                                            ? pauseMedia(e)
                                            : playMedia(song)
                                    } className="content__icon" />

                                )}

                                <div className="mt-1">{truncate(parse(song?.title), 30)}</div>
                            </div>

                            <div title={song?.more_info?.primary_artists_label ? song?.more_info?.primary_artists_label : song?.subtitle} className="text-gray-500">{truncate(song?.more_info?.primary_artists_label ? song?.more_info?.primary_artists_label : song?.subtitle, 25)} | {song?.year}
                            </div>
                            <div className="float-right -mt-4">
                                <AccessTimeIcon className="text-xs lg:text-xs md:text-xs transition duration-200 ease-in
                                 text-gray-400 cursor-pointer " />
                                <span className=" transition duration-200 ease-in text-gray-400 cursor-pointer text-xs lg:text-md md:text-md">{duration(song?.more_info.duration)}</span>

                            </div>
                            <div className="flex space-x-2 song__level__actions  align-middle">
                                <div title="Share"><ShareIcon onClick={(e) => toggleModal(e, true, song)} className=" transition duration-200 ease-in text-gray-500 cursor-pointer text-xs lg:text-md md:text-md hover:text-gray-100" />
                                </div>
                                <div title="Toggle favorite" >
                                    {favoriteSongs.includes(song) ?
                                        (<FavoriteIcon className=" transition duration-200 ease-in text-gray-500 cursor-pointer text-xs lg:text-md md:text-md hover:text-gray-100"
                                            onClick={(e) => toggleFavorites(e, true, song)}
                                            size={4} />) : (<FavoriteBorderIcon className=" transition duration-200 ease-in text-gray-500 cursor-pointer text-xs lg:text-md md:text-md hover:text-gray-100"
                                                onClick={(e) => toggleFavorites(e, true, song)}
                                                size={4} />)}

                                </div>

                                <div title="More">

                                    < MoreHorizIcon onClick={(e) => openMoreOptionsPopOver(e, true, song)}
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
                                    <PlayerMoreOptions openedFromPlaylist={true} onClosed={closeMoreOptionsPopOver} />
                                </Popover>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    </div >);

}

export default PlaylistContent;
