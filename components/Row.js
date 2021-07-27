import React, { useState, useEffect } from "react";
import axios from "../configurations/axios";
import { noImage } from "../utils/utility";


import { Link } from "react-router-dom";
function Row({ title, fetchUrl, seeMoreOfThis }) {
    //data hooks
    const [playlists, setPlaylists] = useState([]);

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
    if (playlists.length > 0) {
        return (
            <div className="font-bold text-gray-100 font-sans ml-5 ">
                <header className="text-sm md:text-lg lg:text-lg sm:text-sm antialiased sm:subpixel-antialiased md:antialiased">
                    {title}
                </header>
                <div className="row__posters flex flex-wrap">
                    {playlists?.map((playlist) => (
                        <Link key={playlist?.id} to={`/playlist/${playlist?.id}/${playlist?.title}`}>
                            <img
                                className="cursor-pointer max-h-52 w-28 md:w-32 lg:w-52 p-2 lg:p-2 transition duration-450 transform hover:scale-110 object-contain"
                                src={
                                    playlist?.image === "(unknown)" ? noImage : playlist?.image
                                }

                            />
                        </Link>
                    ))}
                </div>
            </div>
        );
    } else {
        return null;
    }
}
export default Row;
