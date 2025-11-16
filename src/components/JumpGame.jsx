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
                width: '32px',
                height: `${height}px`,
            }}
        />
    );
};

// Game constants
const GRAVITY = 1; // Gravity strength for falling
const VELOCITY = -20; // Initial upward velocity when jumping
const SPEED = 3; // Base speed - increase this to make obstacles faster
const GROUND_Y = 16; // Ground level

const JumpGame = () => {
    // State Variables
    const [scrollOffset, setScrollOffset] = useState(0);
    const [playerBottom, setPlayerBottom] = useState(16); // Player's bottom position
    const [score, setScore] = useState(0); // Player's score
    const [gameSpeed, setGameSpeed] = useState(SPEED); // Dynamic game speed
    const [isActive, setIsActive] = useState(true); // Toggle state for text
    const [obstacles, setObstacles] = useState([]); // Array of obstacles
    const [gameOver, setGameOver] = useState(false); // Game over state
    const [gameStarted, setGameStarted] = useState(false); // Game started state

    // References
    const gameContainerRef = useRef(null);
    const animationRef = useRef(null);
    const mouseHeld = useRef(false); // Track if left mouse button is currently held
    const lastSpawnTime = useRef(Date.now()); // Obstacle Spawner Timer

    // Particle configurations
    const particles = [
        { initialX: 300, cycleDistance: 400, topPosition: '25%', size: 16, opacity: 0.2 },
        { initialX: 500, cycleDistance: 600, topPosition: '50%', size: 8, opacity: 0.3 },
        { initialX: 400, cycleDistance: 500, topPosition: '75%', size: 12, opacity: 0.1 },
        { initialX: 200, cycleDistance: 350, topPosition: '30%', size: 6, opacity: 0.25 },
        { initialX: 600, cycleDistance: 450, topPosition: '60%', size: 10, opacity: 0.15 },
    ];

    // Score system - increases every 100ms (10 points per second)
    useEffect(() => {
        if (gameOver || !gameStarted) return;

        const scoreInterval = setInterval(() => {
            setScore(prev => prev + 1);
        }, 100);

        return () => clearInterval(scoreInterval);
    }, [gameOver, gameStarted]);

    // Difficulty scaling - increases speed every 100 points
    useEffect(() => {
        const speedMultiplier = 1 + Math.floor(score / 100) * 0.2; // +20% speed every 100 points
        const newSpeed = SPEED * speedMultiplier;
        setGameSpeed(newSpeed);
    }, [score]);

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
        const container = gameContainerRef.current;
        if (!container) return;

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

        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseup', handleMouseUp);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Collision Listener
    useEffect(() => {
        if (gameOver || !gameStarted) return;
        
        const checkCollision = () => {
            const playerLeft = 80;
            const playerRight = playerLeft + 32; // Player width
            const playerBottomPos = playerBottom; // Player's bottom position from ground
            const playerTopPos = playerBottom + 32; // Player's top position from ground
            
            for (const obstacle of obstacles) {
                const obstacleLeft = obstacle.position;
                const obstacleRight = obstacle.position + 32; // Obstacle width
                const obstacleBottomPos = GROUND_Y; // Obstacle bottom at ground level
                const obstacleTopPos = GROUND_Y + obstacle.height; // Obstacle top
                
                // Check horizontal overlap
                const horizontalOverlap = playerRight > obstacleLeft && playerLeft < obstacleRight;
                
                // Check vertical overlap
                const verticalOverlap = playerBottomPos < obstacleTopPos && playerTopPos > obstacleBottomPos;
                
                if (horizontalOverlap && verticalOverlap) {
                    setGameOver(true);
                    return;
                }
            }
        };
        
        const collisionInterval = setInterval(checkCollision, 16);
        return () => clearInterval(collisionInterval);
    }, [obstacles, playerBottom, gameOver, gameStarted]);

    // Jump Cycle Handler
    useEffect(() => {
        const container = gameContainerRef.current;
        if (!container) return;

        const handleClick = (event) => {
            if (event.button === 0 && playerBottom === GROUND_Y && !gameOver && gameStarted) { // Only jump if on ground
                let currentHeight = GROUND_Y;
                let velocity = VELOCITY; // Start with upward velocity
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

        container.addEventListener('mousedown', handleClick);

        return () => {
            container.removeEventListener('mousedown', handleClick);
        };
    }, [playerBottom, gameOver, gameStarted]);

    // Obstacle Spawner Handler
    useEffect(() => {
        if (gameOver || !gameStarted) return;

        const checkSpawn = () => {
            const currentTime = Date.now();
            const spawnDelay = Math.max(1000, 3000 - (gameSpeed * 200));
            
            if (currentTime - lastSpawnTime.current >= spawnDelay) {
                const newObstacle = {
                    id: currentTime,
                    position: 800,
                    height: Math.floor(Math.random() * (100 - 40 + 1)) + 40
                };
                setObstacles(prev => [...prev, newObstacle]);
                lastSpawnTime.current = currentTime;
            }
            
            requestAnimationFrame(checkSpawn);
        };

        const animId = requestAnimationFrame(checkSpawn);
        return () => cancelAnimationFrame(animId);
    }, [gameSpeed, gameOver, gameStarted]);

    // Obstacle Movement Handler
    useEffect(() => {
        if (gameOver || !gameStarted) return;

        const moveObstacles = () => {
            setObstacles(prev => 
                prev
                    .map(obstacle => ({
                        ...obstacle,
                        position: obstacle.position - gameSpeed
                    }))
                    .filter(obstacle => obstacle.position > -50)
            );
        };

        const moveInterval = setInterval(moveObstacles, 16);

        return () => clearInterval(moveInterval);
    }, [gameSpeed, gameOver, gameStarted]);

    // Restart Game Function
    const restartGame = () => {
        setScore(0);
        setGameSpeed(SPEED);
        setObstacles([]);
        setPlayerBottom(GROUND_Y);
        lastSpawnTime.current = Date.now();
        setGameOver(false);
        setGameStarted(true);
    };

    // Start Game Function
    const startGame = () => {
        setGameStarted(true);
    };

    return (
        <div ref={gameContainerRef} className="relative w-full h-full bg-gradient-to-l from-lavender/30 to-royal/30 overflow-hidden rounded-2xl">
            {/* Start Game */}
            {!gameStarted && (
                <div 
                    className="absolute inset-0 bg-black/90 z-10 flex items-center justify-center cursor-pointer"
                    onClick={startGame}
                >
                    <div className="text-white text-center">
                        <h1 className="text-5xl font-medium">WANNA PLAY A GAME?</h1>
                        <div className="text-sm absolute bottom-6 text-subtext left-1/2 transform -translate-x-1/2 opacity-70">Press LEFT CLICK to Start</div>
                    </div>
                </div>
            )}

            {/* Game Over */}
            {gameOver && (
                <div 
                    className="absolute inset-0 bg-black/90 z-10 flex items-center justify-center cursor-pointer"
                    onClick={restartGame}
                >
                    <div className="text-white text-center">
                        <h1 className="text-5xl font-medium">GAME OVER</h1>
                        <p className="text-subtext">Score: {score}</p>
                        <div className="text-sm absolute bottom-6 text-subtext left-1/2 transform -translate-x-1/2 opacity-70">Press LEFT CLICK to Restart</div>
                    </div>
                </div>
            )}

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
                style={{ left: '80px' }}
                animate={{ bottom: `${playerBottom}px` }}
                transition={{ 
                    duration: 0.01,
                    ease: playerBottom > 16 ? "easeOut" : "easeIn"
                }}
            />

            {/* Score Display */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 items-center">
                <h3 className="text-heading">{score}</h3>
            </div>

            {/* Speed Indicator */}
            {/* <div className="absolute top-14 left-1/2 transform -translate-x-1/2 text-white text-xs font-mono opacity-50">
                Speed: {gameSpeed.toFixed(1)}x
            </div> */}

            {/* Dynamic Text Overlay */}
            {/* <div className="absolute top-4 left-4 text-white text-sm font-mono">
                {!isActive ? 'Jumping' : 'Release'}
            </div> */}

            {/* Instructions */}
            <div className="absolute top-4 right-4 text-white text-xs font-mono opacity-70">
                Press LEFT CLICK to Jump
            </div>
        </div>
    );
};

export default JumpGame;