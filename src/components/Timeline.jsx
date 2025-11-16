"use client";;
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({
  data
}) => {
    const ref = useRef(null);
    const containerRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div className="c-space section-spacing" ref={containerRef}>
            <h2 className="text-heading">My Work Experience</h2>
            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
            <div ref={ref} className="relative pb-20">
                {data.map((item, index) => (
                    <div key={index} className="flex justify-start pt-2 md:pt-8 md:gap-2">
                        <div className="sticky flex flex-col md:flex-row z-10 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="w-10 h-10 absolute -left-[15px] rounded-full bg-sun flex items-center justify-center">
                                <div className="h-4 w-4 rounded-full border bg-yellow-200 border-yellow-300 p-2" />
                            </div>
                            <div className="flex-col hidden gap-2 text-xl font-bold md:flex md:pl-20 md:text-4xl text-neutral-300">
                                <h3>{item.date}</h3>
                                <h3 className="text-3xl text-neutral-400">{item.title}</h3>
                                <h3 className="text-3xl text-neutral-500">{item.job}</h3>
                            </div>
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <div className="block md:hidden mb-4 text-2xl font-bold text-left text-neutral-300">
                                <h3>{item.job}</h3>
                                <h3>{item.date}</h3>
                            </div>
                            <ul className="space-y-3">
                                {item.contents.map((content, index) => (
                                    <React.Fragment key={index}>
                                        <li className="flex gap-3 font-normal text-neutral-300 mb-6" key={index}>
                                            <span className="text-sun mt-1.5">•</span>
                                            <span>{content}</span>
                                        </li>
                                        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
                                    </React.Fragment>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
                <div style={{ height: height + "px"}} className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]">
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-sun via-sand/50 to-transparent from-[0%] via-[10%] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};