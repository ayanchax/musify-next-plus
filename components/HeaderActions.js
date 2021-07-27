import React from "react";
import HeaderOption from "./HeaderOption";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import AddIcon from "@material-ui/icons/Add";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MusicNoteIcon from '@material-ui/icons/MusicNote';

function HeaderActions() {
    return (
        <div className="sm:mt-2 md:mt-2 flex flex-grow">
            <HeaderOption title="Recent" Icon={LibraryMusicIcon} />
            <HeaderOption title="Create Playlist" Icon={AddIcon} />
            <HeaderOption title="Liked" Icon={FavoriteIcon} />
            <HeaderOption title="Discover More" Icon={MusicNoteIcon} />

        </div>
    );
}

export default HeaderActions;
