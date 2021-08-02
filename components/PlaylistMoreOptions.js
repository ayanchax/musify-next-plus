import React, { useState, useEffect } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDataLayerContextValue } from "../configurations/DataLayer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE } from "../configurations/environments"
toast.configure();
function PlayerListMoreOptions({ onClosed }) {

    const [{ featuredPlaylist }, dispatch_v2] = useDataLayerContextValue();


    const [copiedPlaylistLink, setCopiedPlaylistLink] = useState(false);


    useEffect(() => {
        if (copiedPlaylistLink) {
            toast.dark("Playlist link copied!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });

            setCopiedPlaylistLink(false)
        }


    }, [copiedPlaylistLink]);
    return (
        <div className="playermoreoptions">

            <li className="player__moreOptionsList" role="presentation">
                Add to Queue
            </li>
            <hr className="player__horizontalBar" />

            <li className="player__moreOptionsList" role="presentation">
                <CopyToClipboard text={BASE + "playlist?playlistid=" + featuredPlaylist?.id + "&playlistTitle=" + encodeURIComponent(featuredPlaylist?.title)}
                    onCopy={() => setCopiedPlaylistLink(true)}>
                    <span>Copy Playlist Link</span>
                </CopyToClipboard>
            </li>


        </div>
    );
}

export default PlayerListMoreOptions;
