import { useRef, useState, useEffect } from "react";
import Card from "../components/Card";
import { Globe } from "../components/Globe";
import CopyEmailButton from "../components/CopyEmailButton";
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
                afternoon: ['Good Afternoon!', 'Hello,', 'Hey there!', 'What\'s up?'],
                evening: ['Good Evening!', 'Evening,', 'Hey,', 'How was your day?'],
                night: ["How's it going?", 'Hello! Night Owl!', 'Working Late Huh? Hi,']
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
                {/* Name and Description */}
                <div className="flex items-end grid-default-color p-6 grid-1">
                    <img src="assets/coding-pov.png" alt="About me" className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]" />
                    <div className="z-10">
                        <p className="headtext">{greeting} I'm Azel Sumanting</p>
                        <p className="subtext">
                            In need of assistance? Don't hesitate to reach out! I am always open to discussing new projects, whether its in mobile or web development.
                            Let's collaborate to bring your ideas to life!
                        </p>
                    </div>
                    <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
                </div>
                {/* Skill Set */}
                <div className="grid-default-color grid-2">
                    <JumpGame />
                </div>
                {/* Location and Remote Work */}
                <div className="grid-black-color grid-3">
                    <div className="z-10 w-[50%]">
                        <p className="headtext">Time Zone</p>
                        <p className="subtext">I'm based in Philippines, and open to remote work.</p>
                    </div>
                    <figure className="absolute left-[30%] top-[10%]">
                        <Globe />
                    </figure>
                </div>
                {/* Email */}
                <div className="grid-special-color grid-4">
                    <div className="flex flex-col items-center justify-center gap-4 size-full">
                        <p className="text-center headtext">Do you want to start a project together?</p>
                        <CopyEmailButton />
                    </div>
                </div>
                {/* Tech Stack */}
                <div className="grid-default-color p-6 grid-5">
                    <div className="z-10 w-[50%]">
                        <p className="headtext">Tech Stack</p>
                        <p className="subtext">I love bringing ideas to life through clean, responsive design and frameworks that make apps and websites feel seamless to use.</p>
                    </div>
                    <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
                        <Frameworks />
                    </div>
                </div>
            </div>
        </section>
    )
};

export default About;