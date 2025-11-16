import { useState } from "react";
import ProjectDetails from "./ProjectDetails";

const Project = ({title, description, subDescription, links, images, tags, setPreview}) => {
    const [isHidden, setIsHidden] = useState(false);

    return (
        <>
            <div onMouseEnter={() => setPreview(images.web)} onMouseLeave={() => setPreview(null)} className="flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0">
                <div>
                    <p className="text-2xl font-bold">{title}</p>
                    <div className="flex gap-5 mt-4">
                        {tags.map((tag) => (
                            <span key={tag.id} className="px-3 py-1 text-sm font-semibold text-sun bg-sun/10 backdrop-blur-sm rounded-full border border-white/20">{tag.name}</span>
                        ))}
                    </div>
                </div>
                <button onClick={() => setIsHidden(true)} className="flex items-center gap-1 cursor-pointer hover-animation">
                    Read More
                    <img src="assets/arrow-right.svg" className="w-5" />
                </button>
            </div>
            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
            {isHidden && 
                <ProjectDetails 
                    title={title} 
                    description={description}
                    subDescription={subDescription}
                    images={images}
                    tags={tags}
                    links={links}
                    closeModal={() => setIsHidden(false)}
                />
            }
        </>
    )
};

export default Project;
