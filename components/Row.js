import React, { useState, useEffect } from "react";
import axios from "../configurations/axios";
import { noImage } from "../utils/utility";
import { useRouter } from "next/router"
function Row({ title, fetchUrl, seeMoreOfThis }) {
    //data hooks
    const [playlists, setPlaylists] = useState([]);
    const router = useRouter()
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl).then((response) => {
                setPlaylists(response?.data);
            }).catch((error) => {
                console.log(error.message)
            });
            return request;
        }
        fetchData();
    }, [fetchUrl]);
    const navigateTo = (e, object, _type) => {
        e.preventDefault();

        if (_type === "playlist") {
            router.push(`/playlist?playlistid=${object?.id}&playlistTitle=${object?.title}`)
        }

    }
    if (playlists.length > 0) {
        return (
            <div className="font-bold text-gray-100 font-sans ml-5 ">
                <header className="text-sm md:text-lg lg:text-lg sm:text-sm antialiased sm:subpixel-antialiased md:antialiased">
                    {title}
                </header>
                <div className="row__posters flex flex-wrap">
                    {playlists?.map((playlist) => (
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
    } else {
        return null;
    }
}
export default Row;
