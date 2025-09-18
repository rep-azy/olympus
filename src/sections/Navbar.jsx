import { useState } from "react";
import { motion } from "motion/react";

// Navigation Component
function Navigation ({ onNavClick }) {
    const handleClick = (e, href) => {
        e.preventDefault();
        const targetId = href.substring(1); // Remove the # symbol
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Call the callback to close mobile menu
        if (onNavClick) onNavClick();
    };

    return (
        <ul className="nav-ul">
            <li className="nav-li">
                <a 
                    className="nav-link" 
                    href="#home"
                    onClick={(e) => handleClick(e, "#home")}
                >
                    Home
                </a>
            </li>
            <li className="nav-li">
                <a 
                    className="nav-link" 
                    href="#about"
                    onClick={(e) => handleClick(e, "#about")}
                >
                    About
                </a>
            </li>
            <li className="nav-li">
                <a 
                    className="nav-link" 
                    href="#work"
                    onClick={(e) => handleClick(e, "#work")}
                >
                    Work
                </a>
            </li>
            <li className="nav-li">
                <a 
                    className="nav-link" 
                    href="#contact"
                    onClick={(e) => handleClick(e, "#contact")}
                >
                    Contact
                </a>
            </li>
        </ul>
    );
};

const Navbar = () => {
    // Burger Menu State
    const [isOpen, setIsOpen] = useState(false);

    // Navigation Menu Handler
    const handleNavClick = () => {
        setIsOpen(false);
    };

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
                        <Navigation onNavClick={handleNavClick} />
                    </nav>
                </div>
            </div>
            
            {/* Mobile Navigation */}
            {isOpen && (
                <motion.div initial={{ opacity: 0, x:-10 }} animate={{ opacity:1, x:0 }} style={{ maxHeight: "100vh" }} transition={{ duration: 1 }} className="block overflow-hidden text-center sm:hidden">
                    <nav className="pb-5">
                        <Navigation onNavClick={handleNavClick} />
                    </nav>
                </motion.div>
            )}
        </div>
    )
}

export default Navbar;
