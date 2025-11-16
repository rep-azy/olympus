import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProjectDetails = ({title, description, subDescription, links, images, tags, closeModal}) => {
    const [showGenDesc, setShowGenDesc] = useState(false);
    const [showWebDesc, setShowWebDesc] = useState(false);
    const [showMobile, setShowMobile] = useState(false);
    const [showMobDesc, setShowMobDesc] = useState(false);

    const closeProject = () => {
        setShowGenDesc(false);
        setShowWebDesc(false);
        setShowMobDesc(false);
        closeModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm">
            <motion.div
                className="relative max-w-6xl border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="flex gap-4 max-w-7xl mx-auto">
                    {/* Mobile Preview */}
                    {showMobile &&
                        <div className="py-5 pl-5 hover-animation group flex items-center">
                            {images.mobile && (
                                <div className="relative">
                                    {/* Mobile Listener */}
                                    <div 
                                        className="absolute w-[50%] h-full left-0 top-0 z-10"
                                        onMouseEnter={() => setShowMobDesc(true)}
                                        onMouseLeave={() => setShowMobDesc(false)}
                                    />

                                    {/* Mobile Description */}
                                    {subDescription.mobile &&
                                    <div className={
                                        `absolute w-full h-full px-4 inset-y-0 left-0
                                        ${showMobDesc ? "opacity-100" : "opacity-0"}
                                        transition-opacity duration-200
                                        bg-gradient-to-r from-midnight/80 via-midnight/60 to-transparent rounded-3xl`
                                    }>
                                        <div className="w-52 h-full flex flex-col justify-center absolute left-4 gap-4">
                                            {subDescription.mobile.map((webDesc, index) => (
                                                <p
                                                    key={index} 
                                                    className={
                                                        `p-3 flex items-center transform-gpu
                                                        font-normal text-sm text-white
                                                        bg-white/10 backdrop-blur-sm
                                                        rounded-xl border border-white/10`}
                                                >
                                                    {webDesc}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    }

                                    <img 
                                        src={images.mobile} 
                                        alt={`${title} Mobile`} 
                                        className="w-full h-auto max-h-[150vh] rounded-3xl"
                                    />
                                </div>
                            )}
                        </div>
                    }

                    {/* Web Preview */}
                    <div className={showMobile ? "py-5 pr-5" : "p-5"}>
                        {/* Header */}
                        <div className="my-4 flex items-center justify-between">
                            {/* Back Button */}
                            <button onClick={closeProject} className="absolute p-2 rounded-sm bg-midnight hover:bg-gray-500 hover-animation z-10">
                                <img src="assets/arrow-left.svg" className="w-6 h-6"/>
                            </button>
                            {/* Project Title */}
                            <div className="w-[75%]">
                                <h1 className="ml-[10%] text-3xl font-bold text-white line-clamp-1">{title}</h1>
                            </div>
                            {/* Tags */}
                            <div className="flex gap-2">
                                {tags.map((tag) => (
                                    <img key={tag.id} src={tag.path} alt={tag.name} className="p-1 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm w-10 h-10 hover-animation" />
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="mb-3 mx-2 font-normal text-neutral-400 text-justify">{description}</p>
                        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-4 h-[1px] w-full" />

                        {/* Body */}
                        <div className="relative hover-animation group mb-4">
                            {/* Web Description Listener */}
                            <div 
                                className="absolute w-[20%] h-[60%] right-0 top-0 z-10"
                                onMouseEnter={() => setShowWebDesc(true)}
                                onMouseLeave={() => setShowWebDesc(false)}
                            />
                            {/* General Description Listener */}
                            <div 
                                className="absolute w-full h-[40%] left-0 bottom-0 z-10" 
                                onMouseEnter={() => setShowGenDesc(true)}
                                onMouseLeave={() => setShowGenDesc(false)}
                            />
                            
                            {/* Web Image */}
                            <img src={images.web} alt={title} className="w-full rounded-2xl" />
                            
                            {/* General Description */}
                            {subDescription.general &&
                                <div className={
                                    `absolute w-full h-[50%] px-4 bottom-0
                                    ${showGenDesc ? "opacity-100" : "opacity-0"}
                                    transition-opacity duration-200
                                    bg-gradient-to-t from-midnight/80 via-midnight/60 to-transparent`
                                }>
                                    <div className={`grid gap-3 h-24 pr-4 absolute ${
                                        subDescription.general.length <= 3 ? showMobile ? 'grid-cols-3 top-[50%]' : 'grid-cols-3 top-[60%]' :
                                        subDescription.general.length === 4 ? showMobile ? 'grid-cols-2 top-[30%]' : 'grid-cols-2 top-[55%]' :
                                        subDescription.general.length === 5 ? showMobile ? 'grid-cols-6 top-[30%]' : 'grid-cols-6 top-[48%]' : 
                                        'grid-cols-3'
                                    }`}>
                                        {subDescription.general.map((genDesc, index) => (
                                            <p 
                                                key={index} 
                                                className={
                                                    `p-3 flex items-center transform-gpu
                                                    font-normal text-sm text-white
                                                    bg-white/10 backdrop-blur-sm
                                                    rounded-xl border border-white/10
                                                    ${subDescription.general.length === 5 ? index < 3 ? 'col-span-2' : 'col-span-3' : ''}`}
                                            >
                                                {genDesc}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            }

                            {/* Web Description */}
                            {subDescription.web &&
                                <div className={
                                    `absolute w-[75%] h-full px-4 inset-y-0 right-0
                                    ${showWebDesc ? "opacity-100" : "opacity-0"}
                                    transition-opacity duration-200
                                    bg-gradient-to-l from-midnight/80 via-midnight/60 to-transparent`
                                }>
                                    <div className={`${showMobile ? 'w-[50%] h-full flex flex-col justify-center absolute right-4 gap-4' : 'w-[50%] h-full flex flex-col justify-center absolute right-2 gap-8'}`}>
                                        {subDescription.web.map((webDesc, index) => (
                                            <p
                                                key={index} 
                                                className={
                                                    `p-3 flex items-center transform-gpu
                                                    font-normal text-sm text-white
                                                    bg-white/10 backdrop-blur-sm
                                                    rounded-xl border border-white/10`}
                                            >
                                                {webDesc}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>

                        {/* Footer */}
                        <div className="w-full h-12 flex justify-between">
                            {/* Preview Button */}
                            {<div className="w-[30%] h-full flex items-center justify-start">
                                {images.mobile &&
                                    <button 
                                        onClick={() => setShowMobile(!showMobile)}
                                        className={`absolute px-5 py-2 rounded-md ${showMobile ? 'bg-sand hover:bg-amber-400' : 'bg-midnight hover:bg-gray-500'} hover-animation z-10`}>
                                        <h2 className="items-center font-medium">
                                            {showMobile ? 'Close Preview' : 'View Application'}
                                        </h2>
                                    </button>
                                }
                            </div>}

                            {/* Demo Link */}
                            <div className="w-[30%] h-full flex gap-4 items-center justify-end">
                                {links.demo ? (
                                    <Link 
                                        to={links.demo}
                                        className="inline-flex items-center gap-1 font-medium cursor-pointer hover-animation"
                                    >
                                        View Demo <img src="assets/arrow-up.svg" className="size-4" />
                                    </Link>
                                ) : (
                                    <span className="inline-flex items-center gap-1 font-medium text-neutral-500">
                                        Demo Coming Soon
                                    </span>
                                )}
                                
                                {/* {links.download && (
                                    <a 
                                        href={links.download}
                                        download
                                        className="inline-flex items-center gap-1 font-medium cursor-pointer hover-animation text-sun"
                                    >
                                        Download <img src="assets/arrow-up.svg" className="size-4" />
                                    </a>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
};

export default ProjectDetails;