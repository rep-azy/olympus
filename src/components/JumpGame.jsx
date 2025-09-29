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

// Obstacle Component
const Obstacle = ({ position, height }) => {
    return (
        <div 
            className="absolute bg-red-600"
            style={{ 
                left: `${position}px`,
                bottom: '16px', // Same level as ground
                width: '30px',
                height: `${height}px`,
            }}
        />
    );
};

// Game constants
const GRAVITY = 1; // Gravity strength for falling
const JUMP_VELOCITY = -20; // Initial upward velocity when jumping
const OBSTACLE_SPEED = 3; // Base speed - increase this to make obstacles faster
const GROUND_Y = 16; // Ground level

const JumpGame = () => {
    const [scrollOffset, setScrollOffset] = useState(0);
    const [isActive, setIsActive] = useState(true); // Toggle state for text
    const [playerBottom, setPlayerBottom] = useState(16); // Player's bottom position
    const [obstacles, setObstacles] = useState([]); // Array of obstacles
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

    // Jump and Release Listener
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

    // Jump Cycle Handler
    useEffect(() => {
        const handleClick = (event) => {
            if (event.button === 0 && playerBottom === GROUND_Y) { // Only jump if on ground
                let currentHeight = GROUND_Y;
                let velocity = JUMP_VELOCITY; // Start with upward velocity
                let peakReached = false; // Track if peak has been reached
                
                // Physics Loop (Runs every 16ms ~60fps)
                const jumpInterval = setInterval(() => {
                    velocity += GRAVITY; // Gravity affects velocity (Reduce upward speed, then increase downward speed)
                    currentHeight -= velocity; // Apply velocity to height (Upward is negative)
                    
                    // Detect peak and add hang time
                    if (!peakReached && velocity >= 0) {
                        peakReached = true;
                        clearInterval(jumpInterval);
                        
                        // Pause at peak for 150ms
                        setTimeout(() => {
                            let fallVelocity = 0;
                            let fallHeight = currentHeight;
                            
                            const fallInterval = setInterval(() => {
                                fallVelocity += GRAVITY;
                                fallHeight -= fallVelocity;
                                
                                if (fallHeight <= GROUND_Y) {
                                    fallHeight = GROUND_Y;
                                    clearInterval(fallInterval);
                                }
                                
                                setPlayerBottom(Math.round(fallHeight));
                            }, 16);
                        }, 150);
                        
                        return;
                    }
                    
                    setPlayerBottom(Math.round(currentHeight));
                }, 16);
            }
        };

        window.addEventListener('mousedown', handleClick);

        return () => {
            window.removeEventListener('mousedown', handleClick);
        };
    }, [playerBottom]);

    // Obstacle spawner handler
    useEffect(() => {
        const spawnObstacle = () => {
            const newObstacle = {
                id: Date.now(),
                position: 800,
                height: Math.floor(Math.random() * (100 - 40 + 1)) + 40
            };
            setObstacles(prev => [...prev, newObstacle]);
        };

        // Faster obstacles = more frequent spawns
        const spawnDelay = Math.max(1000, 3000 - (OBSTACLE_SPEED * 200));
        const spawnInterval = setInterval(spawnObstacle, spawnDelay);

        return () => clearInterval(spawnInterval);
    }, [OBSTACLE_SPEED]);

    // Obstacle movement handler
    useEffect(() => {
        const moveObstacles = () => {
            setObstacles(prev => 
                prev
                    .map(obstacle => ({
                        ...obstacle,
                        position: obstacle.position - OBSTACLE_SPEED
                    }))
                    .filter(obstacle => obstacle.position > -50)
            );
        };

        const moveInterval = setInterval(moveObstacles, 16);

        return () => clearInterval(moveInterval);
    }, [OBSTACLE_SPEED]);

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

            {/* Obstacles */}
            {obstacles.map((obstacle) => (
                <Obstacle
                    key={obstacle.id}
                    position={obstacle.position}
                    height={obstacle.height}
                />
            ))}

            {/* Player */}
            <motion.div
                className="absolute w-8 h-8 bg-blue-500"
                style={{ 
                    left: '80px',
                }}
                animate={{ 
                    bottom: `${playerBottom}px` 
                }}
                transition={{ 
                    duration: 0.01,
                    ease: playerBottom > 16 ? "easeOut" : "easeIn"
                }}
            />

            {/* Dynamic Text Overlay */}
            <div className="absolute top-4 left-4 text-white text-sm font-mono">
                {!isActive ? 'Jumping' : 'Release'}
            </div>

            {/* Instructions */}
            <div className="absolute top-4 right-4 text-white text-xs font-mono opacity-70">
                {playerBottom} Press LEFT CLICK to toggle
            </div>
        </div>
    );
};

export default JumpGame;