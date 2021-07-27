/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { truncate, noImage, capitalizeFirstLetter } from "../utils/utility";

import parse from "html-react-parser"
import { Link } from "react-router-dom";

function AutoSuggest({ songSuggestions, playlistsSuggestions, albumsSuggestion, topArtistsSuggestions }) {

    return (
        <div>
            <div className="suggestBox w-full  z-30 h-auto lg:text-lg md:text-sm text-xs  text-black">
                {songSuggestions?.length > 0 && (
                    <div
                        className="text-gray-300 antialiased 
                            sm:subpixel-antialiased md:antialiased   px-4 py-4 font-semibold uppercase text-xs lg:text-md md:text-md underline"
                    >
                        TOP SONGS
                    </div>
                )}
                {/* SONGS RESULTS */}
                <div className=" suggestBox__songs grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {songSuggestions?.map((songSuggestion, index) => (
                        <Link key={songSuggestion?.id} to={`/song/${songSuggestion?.id}/${songSuggestion?.title}`} key={songSuggestion?.id}
                            title={parse(songSuggestion?.title)}
                            className="px-2 py-1 font-sans  flex flex-grow cursor-pointer group 
                          hover:bg-blue-600"
                        >
                            <div>
                                <img

                                    src={songSuggestion?.image === "(unknown)" ? noImage : songSuggestion?.image}

                                    className="
                transition duration-450 transform hover:scale-110 object-contain  w-12 h-12"
                                />
                            </div>

                            <div className="flex-column group-hover:text-white font-sans mt-2 ml-3 lg:ml-2 lg:mt-0 md:mt-0 md:ml-2">
                                <div
                                    className="searchresult__title align-middle overflow-ellipsis antialiased 
                            sm:subpixel-antialiased md:antialiased font-semibold   group-hover:text-white
                         "
                                >
                                    {truncate(songSuggestion?.title, 20)}
                                </div>

                                <div className="text-gray-400 lg:text-sm md:text-sm text-xs group-hover:text-gray-200">
                                    {truncate(parse(songSuggestion?.more_info?.album, 20))} |{" "}
                                    {capitalizeFirstLetter(songSuggestion?.more_info?.language)}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {/* PLAYLIST RESULTS */}
                {playlistsSuggestions?.length > 0 && (
                    <div
                        className="text-gray-300  antialiased 
                            sm:subpixel-antialiased md:antialiased    px-4 py-4 font-semibold uppercase text-xs lg:text-md md:text-md underline"
                    >
                        RELATED PLAYLISTS
                    </div>
                )}

                <div className=" suggestBox__playlists grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 font-sans ">
                    {playlistsSuggestions?.map((playlistSuggestion, index) => (
                        <Link to={`/playlist/${playlistSuggestion?.id}/${playlistSuggestion?.title}`}
                            title={parse(playlistSuggestion?.title)}
                            className="px-2 py-1 font-sans flex flex-grow cursor-pointer group   hover:bg-blue-600 "
                            key={playlistSuggestion?.id}
                        >
                            <div>
                                <img

                                    src={playlistSuggestion?.image === "(unknown)" ? noImage : playlistSuggestion?.image}
                                    className="
                transition duration-450 transform hover:scale-110 object-contain  w-12 h-12"
                                />
                            </div>

                            <div className="flex-column group-hover:text-white font-sans mt-2 ml-3 lg:ml-2 lg:mt-0 md:mt-0 md:ml-2  ">
                                <div
                                    className="searchresult__title align-middle overflow-ellipsis antialiased 
                            sm:subpixel-antialiased md:antialiased font-semibold group-hover:text-white
                         "
                                >
                                    {truncate(playlistSuggestion?.title, 20)}
                                </div>
                                <div className="text-gray-400 lg:text-sm md:text-sm text-xs group-hover:text-gray-200">
                                    {capitalizeFirstLetter(playlistSuggestion?.language)}
                                </div>
                                {playlistSuggestion?.more_info?.artist_name && (
                                    <div className="text-gray-400 lg:text-sm md:text-sm text-xs group-hover:text-gray-200">
                                        {truncate(playlistSuggestion?.more_info?.artist_name[0], 40)}

                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* ALBUM RESULTS */}
                {albumsSuggestion?.length > 0 && (
                    <div
                        className="text-gray-300  antialiased 
                            sm:subpixel-antialiased md:antialiased    px-4 py-4 font-semibold uppercase text-xs lg:text-md md:text-md underline"
                    >
                        RELATED ALBUMS
                    </div>
                )}
                <div className=" suggestBox__albums font-sans  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {albumsSuggestion?.map((albumSuggestion, index) => (
                        <div
                            title={parse(albumSuggestion?.title)}
                            className="px-2 py-1 font-sans  flex flex-grow cursor-pointer group   hover:bg-blue-600 "
                            key={albumSuggestion?.id}
                        >
                            <div>
                                <img

                                    src={albumSuggestion?.image === "(unknown)" ? noImage : albumSuggestion?.image}
                                    className="
                transition duration-450 transform hover:scale-110 object-contain  w-12 h-12"
                                />
                            </div>

                            <div className="flex-column group-hover:text-white  font-sans mt-2 ml-3 lg:ml-2 lg:mt-0 md:mt-0 md:ml-2">
                                <div
                                    className="searchresult__title align-middle overflow-ellipsis antialiased 
                            sm:subpixel-antialiased md:antialiased font-semibold group-hover:text-white
                         "
                                >
                                    {truncate(albumSuggestion?.title, 20)}
                                </div>
                                <div className="text-gray-400 lg:text-sm md:text-sm text-xs group-hover:text-gray-200">
                                    {truncate(albumSuggestion?.more_info?.music, 40)} |{" "}
                                    {capitalizeFirstLetter(albumSuggestion?.more_info.language)} | {" "}
                                    {albumSuggestion?.more_info.year}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* ARTIST RESULTS */}
                {topArtistsSuggestions?.length > 0 && (
                    <div
                        className="text-gray-300  antialiased 
                            sm:subpixel-antialiased md:antialiased    px-4 py-4 font-semibold uppercase text-xs lg:text-md md:text-md underline"
                    >
                        RELATED ARTISTS
                    </div>
                )}
                <div className=" suggestBox__albums font-sans  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {topArtistsSuggestions?.map((topArtist, index) => (
                        <div
                            title={parse(topArtist?.title)}
                            className="px-2 py-1 font-sans  flex flex-grow cursor-pointer group   hover:bg-blue-600 "
                            key={topArtist?.id}
                        >
                            <div>
                                <img


                                    src={topArtist?.image}
                                    className="
                transition duration-450 transform hover:scale-110 object-contain  w-12 h-12"
                                />
                            </div>

                            <div className="flex-column group-hover:text-white  font-sans mt-2 ml-3 lg:ml-2 lg:mt-2 md:mt-0 md:ml-2">
                                <div
                                    className="searchresult__title align-middle overflow-ellipsis antialiased 
                            sm:subpixel-antialiased md:antialiased font-semibold group-hover:text-white
                         "
                                >
                                    {truncate(topArtist?.title, 30)}
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default AutoSuggest
