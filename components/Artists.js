import React, { useState } from "react";
import Artist from "./Artist";
import HelpIcon from "@material-ui/icons/Help";
function Artists({ genre, isIndian, data, seeMoreIconText }) {
    const [artistsCount, setArtistsCount] = useState(Number(8));
    const [seeMoreText, setSeeMoreText] = useState("See more of this");
    const seeMoreArtists = () => {
        if (seeMoreText === "See Less") {
            setArtistsCount(8);
            setSeeMoreText("See more of this");
            return;
        }
        const currentArtistsCount = artistsCount + 8;
        setArtistsCount(currentArtistsCount);
        if (artistsCount % 8 === 0 && currentArtistsCount < data.length) {
        } else {
            setSeeMoreText("See Less");
        }
    };
    if (data?.length > 0) {
        return (
            <div className="artists">
                <div className="flex flex-grow">
                    <header className=" font-medium text-lg p-6 text-red-400 underline antialiased sm:subpixel-antialiased md:antialiased">
                        {genre} Artists
                    </header>
                    {seeMoreIconText ? (
                        <span
                            onClick={(e) => seeMoreArtists()}
                            className="text-gray-400 no-underline text-xs lg:text-md md:text-sm p-6 mt-1 cursor-pointer antialiased 
                    sm:subpixel-antialiased md:antialiased hover:text-gray-100 "
                        >
                            <HelpIcon className="text-xs lg:text-md md:text-sm" />{" "}
                            {seeMoreText}
                        </span>
                    ) : (
                        ""
                    )}
                </div>

                <div className=" -mt-5  lg:-mt-14 md:-mt-5 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 ml-3 lg:-ml-10">
                    {data.map((needle, index) => {
                        return index < artistsCount ? (
                            <Artist
                                name={needle.name}
                                url={needle.url}
                                isIndian={isIndian}
                                key={needle.id}
                            />
                        ) : undefined;
                    })}
                </div>
            </div>
        );
    } else return null;
}

export default Artists;
