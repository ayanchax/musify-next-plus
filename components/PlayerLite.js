import React, { useState, useRef, useEffect } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { v4 as uuidv4 } from "uuid";
import "react-h5-audio-player/lib/styles.css";
import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { actionTypes } from "../configurations/reducer";
import { useDataLayerContextValue } from "../configurations/DataLayer";
import { truncate } from "../utils/utility";
import GraphicEqIcon from "@material-ui/icons/GraphicEq";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NativeSelect from "@material-ui/core/NativeSelect";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PlayerMoreOptions from "../components/PlayerMoreOptions";
import Popover from "@material-ui/core/Popover";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShareDialog from "../components/ShareDialog";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import parse from "html-react-parser";
import { BASE } from "../configurations/environments";
toast.configure();

export default function PlayerLite({
    setSearchSuggestionWindowOpened,
    media,
    isMediaPaused,
    isMediaAFavorite,
    metaCurrentUrl,
    metaTitle,
    metaDescription,
    metaImage,
}) {
    const playerObject = useRef(null);
    const [{ }, dispatch] = useDataLayerContextValue();
    const [{ currentSongPlaying, featuredPlaylist }, currentSongDispatcher] =
        useDataLayerContextValue();
    const [{ pause, play }, opDispatcher] = useDataLayerContextValue();
    const [favorite, setFavorite] = useState(false);
    const [quality, setAudioQuality] = useState(0);
    const [showModal, updateShowModal] = useState(false);
    const [autoPlayAfterSrcChange, setAutoPlayAfterSrcChange] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    useEffect(() => {
        console.log(media);
        if (isMediaPaused) {
            //pause requested
            playerObject.current.audio.current.pause();
            opDispatcher({
                type: actionTypes.SET_PLAYING,
                play: false,
            });
            opDispatcher({
                type: actionTypes.SET_PAUSED,
                pause: true,
            });
        } else if (media?.id === currentSongPlaying?.id) {
            playerObject.current.audio.current.play();
            opDispatcher({
                type: actionTypes.SET_PLAYING,
                play: true,
            });
            opDispatcher({
                type: actionTypes.SET_PAUSED,
                pause: false,
            });
        }
        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            currentSongPlaying: media,
        });
    }, [isMediaPaused]);

    useEffect(() => {
        setFavorite(isMediaAFavorite);
    }, [isMediaAFavorite]);

    useEffect(() => {
        opDispatcher({
            type: actionTypes.SET_PLAYING,
            play: false,
        });
        opDispatcher({
            type: actionTypes.SET_PAUSED,
            pause: false,
        });
        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            currentSongPlaying: null,
        });
    }, []);
    const endedMedia = () => {
        console.log("Media ends");
        if (window.location.href.indexOf("playlist") >= 0) {
            setUpMeta(
                featuredPlaylist?.id,
                featuredPlaylist?.title,
                featuredPlaylist?.image,
                featuredPlaylist?.header_desc,
                "playlist"
            );
            return;
        }
        if (window.location.href.indexOf("song") >= 0) {
            setUpMeta(null, null, null, null, "default");
            return;
        }
        setUpMeta(null, null, null, null, "default");
    };
    const onPlay = (e) => {
        console.log("Playing");
        //setUpMeta(currentSongPlaying?.id, currentSongPlaying?.title, currentSongPlaying?.image, currentSongPlaying?.subtitle, "song")
        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            currentSongPlaying: media,
        });
        opDispatcher({
            type: actionTypes.SET_PLAYING,
            play: true,
        });
        opDispatcher({
            type: actionTypes.SET_PAUSED,
            pause: false,
        });
    };
    const pauseMedia = (e) => {
        console.log("Paused");
        setUpMeta(
            currentSongPlaying?.id,
            currentSongPlaying?.title,
            currentSongPlaying?.image,
            currentSongPlaying?.subtitle,
            "song"
        );
        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            currentSongPlaying: media,
        });
        opDispatcher({
            type: actionTypes.SET_PLAYING,
            play: false,
        });
        opDispatcher({
            type: actionTypes.SET_PAUSED,
            pause: true,
        });
    };
    const onPlayError = (e) => {
        console.log("Play error");
        setUpMeta(null, null, null, null, "default");
        opDispatcher({
            type: actionTypes.SET_PLAYING,
            play: false,
        });
        opDispatcher({
            type: actionTypes.SET_PAUSED,
            pause: true,
        });
    };
    const toggleModal = (event) => {
        updateShowModal((state) => !state);

        if (showModal) {
            if (currentSongPlaying !== null && (play || pause)) {
                //song meta
                setUpMeta(
                    currentSongPlaying?.id,
                    currentSongPlaying?.title,
                    currentSongPlaying?.image,
                    currentSongPlaying?.subtitle,
                    "song"
                );
            }
        }
    };

    const setUpMeta = (_id, _title, _image, _description, _type) => {
        if (_type === "default") {
            metaCurrentUrl(BASE);
            metaTitle("Enjoy Ad Free Premium Content Music");
            metaImage(BASE + "static/media/logo.6714a076.png");
            metaDescription(
                "Tired of listening to ads and premium subscriptions while streaming music? Well you might like my new music streaming app #musify in this case. Pls visit " +
                BASE +
                " for fresh music content ad free. You just need to sign in using your google credentials and enjoy high quality(320, 640, 1080kbps) ad free music."
            );
            return;
        }
        if (_id && _title && _image && _description && _type) {
            if (_type === "song") {
                metaCurrentUrl(BASE + "song/" + _id + "/" + _title);
                metaTitle(_title);
                metaImage(_image);
                metaDescription(_description);
                return;
            }

            if (_type === "playlist") {
                metaCurrentUrl(BASE + "playlist/" + _id + "/" + _title);
                metaTitle(_title);
                metaImage(_image);
                metaDescription(_description);
                return;
            }
        }
    };
    const openMoreOptionsPopOver = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const closeMoreOptionsPopOver = () => {
        setAnchorEl(null);
    };
    function toggleFavorites(e) {
        if (!favorite) {
            setFavorite(true);
            opDispatcher({
                type: actionTypes.SET_FAVORITE,
                favorited: true,
            });
            toast.dark("Song has been added to your likes", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
        } else {
            setFavorite(false);
            opDispatcher({
                type: actionTypes.SET_FAVORITE,
                favorited: false,
            });
            toast.error("Song has been removed from your likes", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
        }
    }

    const toggleAutoPlay = (e) => {
        if (autoPlayAfterSrcChange) setAutoPlayAfterSrcChange(false);
        else setAutoPlayAfterSrcChange(true);
        if (!autoPlayAfterSrcChange) {
            toast.success("Auto play turned on!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
        } else {
            toast.dark("Auto play turned off!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="player__lite">
            <ShareDialog
                url={
                    BASE +
                    "song/" +
                    currentSongPlaying?.id +
                    "/" +
                    currentSongPlaying?.title
                }
                networks={["facebook", "messenger", "whatsapp"]}
                title="Share!!"
                songThumbnail={currentSongPlaying?.image}
                contentTitle={truncate(currentSongPlaying?.title, 100)}
                content={currentSongPlaying}
                isOpen={showModal}
                updateModalState={toggleModal}
                metaCurrentUrl={metaCurrentUrl}
                metaTitle={metaTitle}
                metaDescription={metaDescription}
                metaImage={metaImage}
                uniqueToken={showModal ? uuidv4() : ""}
            />

            <footer
                onClick={(e) => setSearchSuggestionWindowOpened(false)}
                className={`player  ${!play && !pause ? `translucent` : ``}`}
            >
                <AudioPlayer
                    ref={playerObject}
                    hasDefaultKeyBindings={true}
                    autoPlayAfterSrcChange={autoPlayAfterSrcChange}
                    autoPlay={false}
                    src={media?.more_info?.decrypted_media_url}
                    volume={0.5}
                    showSkipControls={true}
                    onClickPrevious={(e) => console.log()}
                    onClickNext={(e) => console.log()}
                    onEnded={(e) => endedMedia(e)}
                    onPlay={(e) => console.log("Play initiated")}
                    onPlayError={(e) => onPlayError(e)}
                    onError={(e) => console.log()}
                    onPause={(e) => pauseMedia(e)}
                    onEmptied={(e) => console.log("Emptied")}
                    onCanPlay={(e) => console.log("Can Play")}
                    onPlaying={(e) => onPlay(e, media)}
                    onLoadStart={(e) => console.log("Load Start")}
                    onLoadedMetaData={(e) => console.log("Loaded Metadata")}
                    onLoadedData={(e) => console.log("Loaded Data")}
                    onSuspend={(e) => console.log("Suspended")}
                    onWaiting={(e) => console.log("Waiting")}
                    onVolumeChange={(e) => console.log("Volume Changed")}
                    customAdditionalControls={[RHAP_UI.LOOP]}
                    header={
                        <div>
                            {(play || pause) &&
                                (currentSongPlaying !== undefined ||
                                    currentSongPlaying !== "undefined") && (
                                    <div className="flex flex-grow flex-wrap">
                                        <img
                                            className=" w-10 h-10 object-contain"
                                            src={currentSongPlaying?.image}
                                            alt={currentSongPlaying?.title}
                                        />
                                        <Loader
                                            className={` align-middle px-1 py-1 ${!play && pause ? `hide` : ``
                                                }`}
                                            type="Audio"
                                            color="#ff5858"
                                            height={20}
                                            width={20}
                                        />
                                        {!play && pause && (
                                            <div>
                                                &nbsp;
                                                <PlayCircleFilledRoundedIcon
                                                    size={4}
                                                    className="align-middle mt-2"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-column space-x-0">
                                            {currentSongPlaying?.title && (
                                                <div
                                                    title={parse(currentSongPlaying?.title)}
                                                    className="align-middle px-1 py-1 text-sm lg:text-md flex"
                                                >
                                                    {truncate(parse(currentSongPlaying?.title), 50)}
                                                </div>
                                            )}
                                            {(play || pause) &&
                                                (currentSongPlaying !== undefined ||
                                                    currentSongPlaying !== "undefined") && (
                                                    <div
                                                        title={
                                                            currentSongPlaying?.subtitle
                                                                ? parse(currentSongPlaying?.subtitle)
                                                                : ""
                                                        }
                                                        className=""
                                                    >
                                                        {currentSongPlaying?.title && (
                                                            <div className="align-middle ml-1 text-xs lg:text-md md:text-sm text-gray-400">
                                                                {truncate(
                                                                    parse(currentSongPlaying?.subtitle),
                                                                    40
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                        {/* additional controls */}
                                        <div className="flex flex-shrink font-light text-sm justify-center text-center ml-8 px-1 py-1 space-x-2">
                                            <div className="text-xs px-1 py-1 cursor-pointer">
                                                <ShareIcon size={4} onClick={(e) => toggleModal(e)} />
                                            </div>
                                            <div className="-mt-1 text-xs px-1 py-2 cursor-pointer">
                                                {!favorite && (
                                                    <FavoriteBorderIcon
                                                        size={4}
                                                        onClick={(e) => toggleFavorites(e)}
                                                    />
                                                )}
                                                {favorite && (
                                                    <FavoriteIcon
                                                        onClick={(e) => toggleFavorites(e)}
                                                        size={4}
                                                    />
                                                )}
                                            </div>
                                            <div className=" text-xs px-1 py-1 cursor-pointer">
                                                <MoreHorizIcon
                                                    onClick={(e) => openMoreOptionsPopOver(e)}
                                                    size={4}
                                                />
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
                                                        openedFromPlaylist={false}
                                                        onClosed={closeMoreOptionsPopOver}
                                                    />
                                                </Popover>
                                            </div>
                                            <div className="mt-2 px-1 py-1 ml-5">
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={autoPlayAfterSrcChange}
                                                            onChange={(e) => toggleAutoPlay(e)}
                                                            name="checkedB"
                                                            color="primary"
                                                            size="small"
                                                        />
                                                    }
                                                    label="A"
                                                    className="text-xs"
                                                    title="Toggle autoplay"
                                                />
                                            </div>

                                            <div className=" mt-2 px-1 py-1 flex flex-grow ">
                                                <GraphicEqIcon className="content__audio__quality__icon" />
                                                <div className="content__audio__quality">
                                                    <NativeSelect
                                                        value={quality}
                                                        onChange={(e) => setAudioQuality(e.target.value)}
                                                        inputProps={{
                                                            name: "quality",
                                                            id: "audio-quality-helper",
                                                        }}
                                                    >
                                                        <option defaultValue value={0}>
                                                            Auto
                                                        </option>
                                                        <option value={1}>High</option>
                                                        <option value={2}>Medium</option>
                                                        <option value={3}>Low</option>
                                                    </NativeSelect>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>
                    }
                />
            </footer>
        </div>
    );
}
