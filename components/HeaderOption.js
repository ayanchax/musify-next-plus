import React from "react";

function HeaderOption({ title, Icon }) {
    return (
        <div className=" flex flex-grow space-x-4 h-10 items-center  justify-center cursor-pointer transition duration-200 ease-in font-sans text-gray-400  ">
            {Icon ? (
                <h4 className="text-sm sm:text-sm md:text-md lg:text-lg antialiased sm:subpixel-antialiased md:antialiased hover:text-gray-100">
                    <Icon />
                    {title}
                </h4>
            ) : (
                <p>{title}</p>
            )}
        </div>
    );
}

export default HeaderOption;
