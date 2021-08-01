import React from 'react'
function IndianRegional({ data }) {
    if (data?.length > 0) {
        return (

            <div className="regional">
                <div className="flex flex-grow">
                    <header className="font-medium text-lg p-6 lg:-mt-16 text-red-400 underline antialiased sm:subpixel-antialiased md:antialiased">Indian Regionals
                    </header>
                </div>

                <div className="lg:-mt-14 md:-mt-5 -mt-12 grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 ml-3 lg:ml-2">
                    {data?.map((needle, index) => (

                        <div key={needle.title} className=" align-top inline-block text-center w-20 mt-10 md:mt-1 lg:mt-10 md:w-28 lg:w-48  lg:px-2 lg:py-2 cursor-pointer ">
                            <img className=" cursor-pointer rounded-full
                    transition duration-450 transform hover:scale-110 object-contain"
                                src={needle.url}
                                alt={needle.title}
                            />
                            <span className="block text-center sm:text-xs text-sm text-gray-200  
                        md:text-sm lg:text-xl antialiased sm:subpixel-antialiased md:antialiased">{needle.city}</span>
                        </div>
                    ))}
                </div>
            </div>

        )
    }
    else return ""
}

export default IndianRegional
