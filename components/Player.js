import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useRef, useEffect } from "react";
import "react-h5-audio-player/lib/styles.css";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import "./Player.css";
function Player({ isPauseRequested, src, title, artist, autoPlay, autoPlayAfterSrcChange }) {
    const playerObject = useRef(null);
    useEffect(() => {
        if (isPauseRequested) {
            playerObject.current.audio.current.pause()
            //   console.log(playerObject.current.audio.current);
        }

    }, [isPauseRequested]);
    return (
        <div className="player">
            <AudioPlayer
                ref={playerObject}
                autoPlayAfterSrcChange={autoPlayAfterSrcChange}
                autoPlay={autoPlay}
                src={src}
                onPlay={(e) => console.log("playing")}
                volume={0.5}
                layout="stacked-reverse"
                customAdditionalControls={[
                    RHAP_UI.LOOP,
                    <SkipPreviousIcon className="skipBtn" />,
                    <SkipNextIcon className="skipBtn" />,
                ]}

            />
        </div>
    );
}

export default Player;
