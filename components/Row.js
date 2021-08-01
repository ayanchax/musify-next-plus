import React, { useState, useEffect } from "react";
import { noImage } from "../utils/utility";
import { useRouter } from "next/router"

function Row({ title, contents }) {
    //data hooks

    const [playlists, setPlaylists] = useState([]);
    const router = useRouter()
    useEffect(() => {
        setPlaylists(contents);
    }, [contents]);

    const navigateTo = (e, object, _type) => {
        e.preventDefault();

        if (_type === "playlist") {
            router.push(`/playlist?playlistid=${object?.id}&playlistTitle=${object?.title}`)
        }

    }
    if (playlists) {
        try {
            return (
                <div className="font-bold text-gray-100 font-sans ml-5 ">
                    <header className="text-sm md:text-lg lg:text-lg sm:text-sm antialiased sm:subpixel-antialiased md:antialiased">
                        {title}
                    </header>
                    <div className="row__posters flex flex-wrap">
                        {playlists && playlists?.map((playlist) => (
                            <a onClick={(e) => navigateTo(e, playlist, "playlist")} key={playlist?.id} href="#" >
                                <img
                                    className="cursor-pointer max-h-52 w-28 md:w-32 lg:w-52 p-2 lg:p-2 transition duration-450 transform hover:scale-110 object-contain"
                                    src={
                                        playlist?.image === "(unknown)" ? noImage : playlist?.image
                                    }

                                />
                            </a>
                        ))}
                    </div>
                </div>
            );
        } catch (e) {
            <div className="flex text-md text-gray-300">Content unavailable at this moment.</div>
        }
    } else {
        return (" ");
    }
}
export default Row;


