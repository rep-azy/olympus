import { useRef, useState, useEffect } from "react";
import Card from "../components/Card";
import { Globe } from "../components/Globe";
import WorkAvailability from "../components/WorkAvailability";
import { Frameworks } from "../components/Frameworks";
import JumpGame from "../components/JumpGame";

const About = () => {
    const grid2Container = useRef(null);
    const [greeting, setGreeting] = useState('Hello');

    useEffect(() => {
        const getGreeting = () => {
            const hour = new Date().getHours();
            const greetings = {
                morning: ['Good Morning!', 'Rise and shine!', 'Morning Grind!', 'Top of the morning!'],
                afternoon: ['Good Afternoon!', 'Hello there!', 'Hey there!', 'What\'s up?'],
                evening: ['Good Evening!', 'Evening', 'Hey man', 'How was your day?'],
                night: ["How's it going?", 'Hello! Night Owl!', 'Working Late Huh?']
            };
            
            if (hour >= 5 && hour < 12) {
                return greetings.morning[Math.floor(Math.random() * greetings.morning.length)];
            } else if (hour >= 12 && hour < 17) {
                return greetings.afternoon[Math.floor(Math.random() * greetings.afternoon.length)];
            } else if (hour >= 17 && hour < 21) {
                return greetings.evening[Math.floor(Math.random() * greetings.evening.length)];
            } else {
                return greetings.night[Math.floor(Math.random() * greetings.night.length)];
            }
        };
        
        setGreeting(getGreeting());
    }, []);
    
    return (
        <section className="c-space section-spacing">
            <h2 className="text-heading">About me</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12 relative">
                {/* Name and Description */}
                <div className="flex items-end grid-default-color p-6 grid-1">
                    <img src="assets/fall-tapestry.jpg" alt="About me" className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[4.5] md:left-50 md:inset-y-30 lg:scale-[2.6] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="z-10">
                        <p className="headtext">{greeting}</p>
                        <p className="subtext">
                            In need of assistance? Don't hesitate to reach out! I am always open to discussing new projects, whether its in mobile or web development.
                            Let's collaborate to bring your ideas to life!
                        </p>
                    </div>
                    <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3" />
                </div>
                {/* Skill Set */}
                <div className="grid-default-color grid-2">
                    <JumpGame />
                </div>
                {/* Location and Remote Work */}
                <div className="grid-black-color grid-3">
                    <div className="z-10 w-[45%]">
                        <p className="headtext">Where I'm Rooted</p>
                        <p className="subtext">Working from Silang, Cavite, Philippines. Available for remote projects and nearby opportunities.</p>
                    </div>
                    <div className={`absolute -right-12 -bottom-12 w-80 h-80 bg-sun opacity-20 rounded-full blur-3xl z-10`} />
                    <figure className="absolute left-[30%] top-[10%]">
                        <Globe />
                    </figure>
                </div>
                {/* Work Availability */}
                <div className="grid-black-color grid-4">
                    <WorkAvailability />
                </div>
                {/* Tech Stack */}
                <div className="grid-black-color p-6 grid-5 flex items-end">
                    <div className="z-10 w-[50%]">
                        <p className="headtext">My Current Palette</p>
                        <p className="subtext">The tools I blend together to craft warm, inviting digital experiences that feel natural and effortless.</p>
                    </div>
                    <div className={`absolute -right-12 bottom-18 w-32 h-32 bg-yellow-300 opacity-40 rounded-full blur-3xl`} />
                    <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
                        <Frameworks />
                    </div>
                </div>
            </div>
        </section>
    )
};

export default About;