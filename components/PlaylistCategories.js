import React, { useState } from "react";
import Row from "./Row";
function PlaylistCategories({ isIndian, categoryMap }) {
    const [moodPlaylists, setMoodPlaylists] = useState([]);
    const categories = isIndian ? categoryMap[0].INDIAN : categoryMap[0].WESTERN;
    const loadMore = (object) => {
        var playlist = [];
        object?.map((needle) => playlist.push(needle));
        setMoodPlaylists(playlist);
    };
    return (
        <div>
            <div className="playlist__categories">
                {categories?.map((category) => (
                    <Row
                        key={category?.title}
                        title={category?.title}
                        fetchUrl={category?.url}
                        seeMoreOfThis={category?.seemore}
                    />
                ))}
                {moodPlaylists?.map((_moodPlaylist) => (
                    <Row
                        key={_moodPlaylist?.title}
                        title={_moodPlaylist?.title}
                        fetchUrl={_moodPlaylist?.url}
                        seeMoreOfThis={_moodPlaylist?.seemore}
                    />
                ))}
            </div>
            <div className="loadMore__MoodCategories">
                {/* load more */}
                {moodPlaylists.length === 0 && (
                    <div
                        onClick={(e) => loadMore(categoryMap[0].MOOD)}
                        className="text-xs lg:text-xl md:text-sm justify-center 
          antialiased sm:subpixel-antialiased md:antialiased flex flex-grow text-center text-gray-100 cursor-pointer"
                    >
                        Load More
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlaylistCategories;
