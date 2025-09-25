import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

// Particle Component
const Particle = ({ scrollOffset, initialX, cycleDistance, topPosition, size, opacity }) => {
    return (
        <div 
            className={`absolute bg-white rounded-full`}
            style={{ 
                left: `${initialX - (scrollOffset % cycleDistance)}px`,
                top: topPosition,
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
                transform: 'translateX(-50%)'
            }}
        />
    );
};

// Game constants
const GRAVITY = 0.8;
const JUMP_FORCE = -15;
const GROUND_Y = 0;

const JumpGame = () => {
    const [scrollOffset, setScrollOffset] = useState(0);
    const [isActive, setIsActive] = useState(true); // Toggle state for text
    const [playerBottom, setPlayerBottom] = useState(16); // Player's bottom position
    const animationRef = useRef(null);
    const mouseHeld = useRef(false); // Track if left mouse button is currently held

    // Particle configurations
    const particles = [
        { initialX: 300, cycleDistance: 400, topPosition: '25%', size: 16, opacity: 0.2 },
        { initialX: 500, cycleDistance: 600, topPosition: '50%', size: 8, opacity: 0.3 },
        { initialX: 400, cycleDistance: 500, topPosition: '75%', size: 12, opacity: 0.1 },
        { initialX: 200, cycleDistance: 350, topPosition: '30%', size: 6, opacity: 0.25 },
        { initialX: 600, cycleDistance: 450, topPosition: '60%', size: 10, opacity: 0.15 },
    ];

    // Side Scroller Animation Handler
    useEffect(() => {
        const animate = () => {
            setScrollOffset(prev => prev + 1); // Move 1 pixel per frame
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    // Handle left mouse button press and release
    useEffect(() => {
        const handleMouseDown = (event) => {
            if (event.button !== 0 || mouseHeld.current) return;
            
            event.preventDefault();
            mouseHeld.current = true;
            setIsActive(false);
        };

        const handleMouseUp = (event) => {
            if (event.button !== 0) return;
            
            event.preventDefault();
            mouseHeld.current = false;
            setIsActive(true);
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Handle complete jump cycle on mouse click
    useEffect(() => {
        const handleClick = (event) => {
            if (event.button === 0) { // Only jump if on ground
                // Jump up
                setPlayerBottom(prev => prev + 180);
                
                // Fall back down after a brief moment
                setTimeout(() => {
                    setPlayerBottom(16);
                }, 200); // Small delay to show the jump peak
            }
        };

        window.addEventListener('mousedown', handleClick);

        return () => {
            window.removeEventListener('mousedown', handleClick);
        };
    }, [playerBottom]);

    return (
        <div className="relative w-full h-full bg-gradient-to-l from-lavender/30 to-royal/30 overflow-hidden rounded-2xl">
            {/* Ground */}
            <div className="absolute bottom-0 w-full h-4 bg-gray-600"/>
            
            {/* Background Particles */}
            {particles.map((particle, index) => (
                <Particle
                    key={index}
                    scrollOffset={scrollOffset}
                    initialX={particle.initialX}
                    cycleDistance={particle.cycleDistance}
                    topPosition={particle.topPosition}
                    size={particle.size}
                    opacity={particle.opacity}
                />
            ))}

            {/* Player */}
            <motion.div 
                className="absolute w-8 h-8 bg-blue-500 rounded"
                style={{ 
                    left: '80px',
                }}
                animate={{ 
                    bottom: `${playerBottom}px` 
                }}
                transition={{ 
                    duration: 0.3,
                    ease: playerBottom > 16 ? "easeOut" : "easeIn"
                }}
            />

            {/* Dynamic Text Overlay */}
            <div className="absolute top-4 left-4 text-white text-sm font-mono">
                {!isActive ? 'Jumping' : 'Release'}{playerBottom}
            </div>

            {/* Instructions */}
            <div className="absolute top-4 right-4 text-white text-xs font-mono opacity-70">
                Hold LEFT CLICK to toggle
            </div>
        </div>
    );
};

export default JumpGame;