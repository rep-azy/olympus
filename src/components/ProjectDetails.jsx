import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProjectDetails = ({title, description, subDescription, links, images, tags, closeModal}) => {
    const [showGenDesc, setShowGenDesc] = useState(false);
    const [showWebDesc, setShowWebDesc] = useState(false);
    const [showMobile, setShowMobile] = useState(true);

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
                        <div className="py-5 pl-5 hover-animation group">
                            {images.mobile && (
                                <div className="relative">
                                    <img 
                                        src={images.mobile} 
                                        alt={`${title} Mobile`} 
                                        className="w-full h-auto max-h-[135vh] rounded-3xl"
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
                            <button onClick={closeModal} className="absolute p-2 rounded-sm bg-midnight hover:bg-gray-500 hover-animation z-10">
                                <img src="assets/arrow-left.svg" className="w-6 h-6"/>
                            </button>
                            {/* Project Title */}
                            <div className="w-[75%]">
                                <h1 className="ml-[10%] text-3xl font-bold text-white text-ellipsis">{title}</h1>
                            </div>
                            {/* Tags */}
                            <div className="flex gap-2">
                                {tags.map((tag) => (
                                    <img key={tag.id} src={tag.path} alt={tag.name} className="p-1 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm w-10 h-10 hover-animation" />
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="mb-3 font-normal text-neutral-400">{description}</p>
                        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-4 h-[1px] w-full" />

                        {/* Body - Web Image with Hover Areas */}
                        <div className="relative hover-animation group mb-4">
                            {/* Hover Areas */}
                            {/* <div className="absolute w-[60%] h-[20%] left-[20%] top-0 bg-red-500 z-10" /> */}
                            {/* <div className="absolute w-[20%] h-[60%] left-0 top-0 bg-blue-500 z-10" /> */}
                            {/* Web Description */}
                            <div 
                                className="absolute w-[20%] h-[60%] right-0 top-0 z-10"
                                onMouseEnter={() => setShowWebDesc(true)}
                                onMouseLeave={() => setShowWebDesc(false)}
                            />
                            {/* General Description */}
                            <div 
                                className="absolute w-full h-[40%] left-0 bottom-0 z-10" 
                                onMouseEnter={() => setShowGenDesc(true)}
                                onMouseLeave={() => setShowGenDesc(false)}
                            />
                            
                            {/* Image */}
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
                                        subDescription.general.length <= 3 ? 'grid-cols-3 top-[45%]' :
                                        subDescription.general.length === 4 ? 'grid-cols-2 top-[30%]' :
                                        subDescription.general.length === 5 ? 'grid-cols-6 top-[20%]' :
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
                                    `absolute w-[50%] h-full px-4 inset-y-0 right-0
                                    ${showWebDesc ? "opacity-100" : "opacity-0"}
                                    transition-opacity duration-200
                                    bg-gradient-to-l from-midnight/80 via-midnight/60 to-transparent`
                                }>
                                    <div className="w-52 h-full flex flex-col justify-center absolute right-2">
                                        {subDescription.web.map((webDesc, index) => (
                                            <p
                                                key={index} 
                                                className={
                                                    `p-3 mb-4 flex items-center transform-gpu
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
                        
                        {/* <div className="items-center mt-4">
                            <div className="flex gap-3">
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
                                
                                {links.download && (
                                    <a 
                                        href={links.download}
                                        download
                                        className="inline-flex items-center gap-1 font-medium cursor-pointer hover-animation text-sun"
                                    >
                                        Download <img src="assets/arrow-up.svg" className="size-4" />
                                    </a>
                                )}
                            </div>
                        </div> */}
                    </div>
                </div>
                {/* Image Grid - Shows web and/or mobile screenshots */}
                {/* <div className={`grid ${images.web && images.mobile ? 'grid-cols-2' : 'grid-cols-1'} gap-2 p-2`}>
                    {images.web && (
                        <div className="relative">
                            <img src={images.web} alt={`${title} Web`} className="w-full rounded-lg" />
                            <span className="absolute bottom-2 left-2 px-2 py-1 text-xs font-semibold bg-midnight/80 backdrop-blur-sm rounded text-white">
                                Web
                            </span>
                        </div>
                    )}
                    {images.mobile && (
                        <div className="relative">
                            <img src={images.mobile} alt={`${title} Mobile`} className="w-full rounded-lg" />
                            <span className="absolute bottom-2 left-2 px-2 py-1 text-xs font-semibold bg-midnight/80 backdrop-blur-sm rounded text-white">
                                Mobile
                            </span>
                        </div>
                    )}
                </div> */}
            </motion.div>
        </div>
    )
};

export default ProjectDetails;