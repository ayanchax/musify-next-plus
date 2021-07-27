import React from 'react'

function Band({ name, url, isIndian }) {
    return (
        <div className=" align-top inline-block text-center w-20 md:w-28 lg:w-56 p-3 md:p-3 lg:px-14 lg:py-14 cursor-pointer ">
            <img className="rounded-full cursor-pointer 
            transition duration-450 transform hover:scale-110 object-contain"
                src={url}
                alt={name}
            />
            <span className="block text-center sm:text-xs text-sm text-gray-200  md:text-sm lg:text-md antialiased sm:subpixel-antialiased md:antialiased">{name}</span>
        </div>
    )
}

export default Band
