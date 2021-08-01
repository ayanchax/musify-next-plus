import React from "react";
import Band from "./Band";

function Bands({ genre, isIndian, data }) {
    if (data && data?.length > 0) {
        return (
            <div className="artists">
                <div className="flex flex-grow">
                    <header className=" font-medium text-lg p-6 text-red-400 underline antialiased sm:subpixel-antialiased md:antialiased">
                        {genre} Bands
                    </header>
                </div>

                <div className=" -mt-5  lg:-mt-14 md:-mt-5 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 ml-3 lg:-ml-10">
                    {data?.map((needle, index) => (
                        <Band
                            name={needle.name}
                            url={needle.url}
                            isIndian={isIndian}
                            key={needle.id}
                        />
                    ))}
                </div>
            </div>
        );
    } else return null;
}

export default Bands;
