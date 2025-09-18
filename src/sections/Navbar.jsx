import { useState } from "react";
import { motion } from "motion/react";

// Navigation Component
function Navigation () {
    return (
        <ul className="nav-ul">
            <li className="nav-li">
                <a className="nav-link" href="#home">Home</a>
            </li>
            <li className="nav-li">
                <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-li">
                <a className="nav-link" href="#work">Work</a>
            </li>
            <li className="nav-li">
                <a className="nav-link" href="#contact">Contact</a>
            </li>
        </ul>
    );
}

const Navbar = () => {
    // Burger Menu State
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
            <div className="mx-auto c-space max-w-7xl">
                {/* Header */}
                <div className="flex items-center justify-between py-2 sm:py-0">
                    {/* Navigation Title */}
                    <a href="/" className="text-xl font-bold transition-colors text-neutral-400 hover:text-white">Olympus</a>
                    {/* Burger Menu Button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="flex cursor-pointer text-neutral-400 hover:text-white sm:hidden">
                        <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} className="w-6 h-6" alt="toggle" />
                    </button>
                    {/* Navigation Links */}
                    <nav className="hidden sm:flex">
                        <Navigation />
                    </nav>
                </div>
            </div>
            
            {/* Mobile Navigation */}
            {isOpen && (
                <motion.div initial={{ opacity: 0, x:-10 }} animate={{ opacity:1, x:0 }} style={{ maxHeight: "100vh" }} transition={{ duration: 1 }} className="block overflow-hidden text-center sm:hidden">
                    <nav className="pb-5">
                        <Navigation />
                    </nav>
                </motion.div>
            )}
        </div>
    )
}

export default Navbar;
