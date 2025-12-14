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
const Obstacle = ({ position, height, width }) => {
    // Map width to sprite size
    const getSizeVariant = (width) => {
        switch(width) {
            case 32: return 's';
            case 48: return 'm';
            case 64: return 'l';
            case 80: return 'xl';
            case 96: return '2xl';
            default: return 's';
        }
    };

    return (
        <img
            src={`/assets/game/main/obstacle-${getSizeVariant(width)}.png`}
            className="absolute"
            style={{ 
                left: `${position}px`,
                bottom: '16px',
                width: `${width}px`,
                height: `${height}px`,
                imageRendering: 'pixelated'
            }}
            alt={`obstacle-${getSizeVariant(width)}`}
        />
    );
};

// Ground Component
const Ground = ({ score, gameStarted, gameOver }) => {
    const [currentVariant, setCurrentVariant] = useState(1);
    const [previousVariant, setPreviousVariant] = useState(null);
    const [groundScrollOffset, setGroundScrollOffset] = useState(0);
    const groundAnimationRef = useRef(null);

    const BASE_GROUND_SPEED = 2.6;

    // Change ground sprite every 200 score, cycle through 6 variants
    const getGroundVariant = () => {
        const segment = Math.floor(score / 200) % 6;
        return segment + 1;
    };

    const targetVariant = getGroundVariant();

    // Handle transitions when variant changes
    useEffect(() => {
        if (targetVariant !== currentVariant) {
            setPreviousVariant(currentVariant);
            
            // Wait for fade animation, then clear previous
            setTimeout(() => {
                setPreviousVariant(null);
            }, 2000);
            
            setCurrentVariant(targetVariant);
        }
    }, [targetVariant]);

    // Ground scrolling animation
    useEffect(() => {
        if (groundAnimationRef.current) {
            cancelAnimationFrame(groundAnimationRef.current);
        }

        if (!gameStarted || gameOver) {
            setGroundScrollOffset(0);
            return;
        }

        const animate = () => {
            setGroundScrollOffset(prev => {
                const speedMultiplier = 1 + Math.floor(score / 100) * 0.1;
                const currentSpeed = BASE_GROUND_SPEED * speedMultiplier;
                return prev + currentSpeed;
            });
            groundAnimationRef.current = requestAnimationFrame(animate);
        };

        groundAnimationRef.current = requestAnimationFrame(animate);

        return () => {
            if (groundAnimationRef.current) {
                cancelAnimationFrame(groundAnimationRef.current);
            }
        };
    }, [gameStarted, gameOver, score]);

    // Create ground tiles
    const groundTiles = [];
    const tileWidth = 200;
    const numTiles = 6;

    for (let i = 0; i < numTiles; i++) {
        const xPosition = (i * tileWidth) - (groundScrollOffset % tileWidth);
        
        // Previous tiles (fading out)
        if (previousVariant !== null) {
            groundTiles.push(
                <motion.img
                    key={`prev-${previousVariant}-${i}`}
                    src={`/assets/game/main/ground-${previousVariant}.png`}
                    className="absolute bottom-0 h-4"
                    style={{
                        left: `${xPosition}px`,
                        width: `${tileWidth}px`,
                        height: '16px',
                        imageRendering: 'pixelated'
                    }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    alt={`ground-${previousVariant}`}
                />
            );
        }
        
        // Current tiles (fading in)
        groundTiles.push(
            <motion.img
                key={`current-${currentVariant}-${i}`}
                src={`/assets/game/main/ground-${currentVariant}.png`}
                className="absolute bottom-0 h-4"
                style={{
                    left: `${xPosition}px`,
                    width: `${tileWidth}px`,
                    height: '16px',
                    imageRendering: 'pixelated'
                }}
                initial={{ opacity: previousVariant !== null ? 0 : 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                alt={`ground-${currentVariant}`}
            />
        );
    }

    return <>{groundTiles}</>;
};

// Player Sprite Component
const PlayerSprite = ({ part, variant, state, zIndex, offsetY = 0 }) => {
    if (variant === 'none') return null;
    
    const filename = state 
        ? `${part}-${variant}-${state}.png`
        : `${part}-${variant}.png`;
    
    return (
        <motion.img 
            src={`/assets/game/main/${filename}`}
            className="w-full h-full absolute"
            style={{ 
                zIndex,
                imageRendering: 'pixelated'
            }}
            animate={{ y: offsetY }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
            alt={filename}
        />
    );
};

// Game constants
const GRAVITY = 1; // Gravity strength for falling
const VELOCITY = -20; // Initial upward velocity when jumping
const SPEED = 3; // Base speed - increase this to make obstacles faster
const GROUND_Y = 16; // Ground level
const HIGH_SCORE_KEY = 'jump-game-high-score';

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

    const [highScore, setHighScore] = useState(() => {
        try {
            const stored = window.localStorage.getItem(HIGH_SCORE_KEY);
            return stored ? parseInt(stored, 10) : 0;
        } catch (error) {
            console.error('Failed to load high score:', error);
            return 0;
        }
    });

    const [playerAnimation, setPlayerAnimation] = useState({
        status: 1,
        x: 1,
        y: 1,
        eye: 0,
    });

    // References
    const gameContainerRef = useRef(null);
    const animationRef = useRef(null);
    const jumpIntervalRef = useRef(null);
    const spawnAnimationRef = useRef(null);
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

    // Saving Highscore System
    useEffect(() => {
        try {
            window.localStorage.setItem(HIGH_SCORE_KEY, highScore.toString());
        } catch (error) {
            console.error('Failed to save high score:', error);
        }
    }, [highScore]);

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
            const playerRight = playerLeft + 32;
            const playerBottomPos = playerBottom;
            const playerTopPos = playerBottom + 32;
            
            // Add extra detection margins for more aggressive collision
            const horizontalMargin = 8; // Horizontal detection range
            const verticalMargin = 16; // Even more aggressive vertical detection
            
            for (const obstacle of obstacles) {
                const obstacleLeft = obstacle.position;
                const obstacleRight = obstacle.position + obstacle.width;
                const obstacleBottomPos = GROUND_Y;
                const obstacleTopPos = GROUND_Y + obstacle.height;
                
                // Expanded horizontal overlap - catches player earlier
                const horizontalOverlap = (playerRight + horizontalMargin) > obstacleLeft && (playerLeft - horizontalMargin) < obstacleRight;
                const verticalOverlap = playerBottomPos < (obstacleTopPos + verticalMargin) && playerTopPos > obstacleBottomPos;
                
                // Enhanced air collision detection with extended range
                const isPlayerOverObstacle = (playerRight + horizontalMargin) > obstacleLeft && (playerLeft - horizontalMargin) < obstacleRight;
                const isPlayerTooLow = playerBottomPos <= (obstacleTopPos + verticalMargin); // Extended vertical detection
                const isInAir = playerBottom > GROUND_Y;
                
                // Aggressive vertical range check - much wider zone
                const bottomInRange = playerBottomPos >= (obstacleBottomPos - verticalMargin) && playerBottomPos < (obstacleTopPos + verticalMargin * 2);
                
                // Very aggressive descending check - catches player well above obstacle
                const isDescending = isInAir && playerBottomPos < (obstacleTopPos + verticalMargin * 3);
                
                // Check if player is anywhere near the obstacle vertically while in air
                const isNearObstacle = isInAir && playerBottomPos < (obstacleTopPos + verticalMargin * 2.5);
                
                // Traditional collision - immediate detection on contact
                if (horizontalOverlap && verticalOverlap) {
                    if (jumpIntervalRef.current) {
                        clearInterval(jumpIntervalRef.current);
                    }
                    setPlayerAnimation(prev => ({ ...prev, status: 0 })); // Set to dead
                    setGameOver(true);
                    setPlayerBottom(playerBottom);
                    return;
                }
                
                // Aggressive air collision: triggers if player is in air, overlapping horizontally
                // AND any of these conditions are met
                if (isInAir && isPlayerOverObstacle && (isPlayerTooLow || bottomInRange || isDescending || isNearObstacle)) {
                    if (jumpIntervalRef.current) {
                        clearInterval(jumpIntervalRef.current);
                    }
                    setPlayerAnimation(prev => ({ ...prev, status: 0 })); // Set to dead
                    setGameOver(true);
                    setPlayerBottom(playerBottom);
                    return;
                }
            }
        };
        
        // Run at same rate as physics (60fps) for immediate detection
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

                // Squash before jump
                setPlayerAnimation(prev => ({ ...prev, x: 1.2, y: 0.9, eye: -10 }));
                
                setTimeout(() => {
                    // Stretch during ascent
                    setPlayerAnimation(prev => ({ ...prev, x: 0.9, y: 1.2, eye: -10 }));
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

                                // Stretch during fall
                                setPlayerAnimation(prev => ({ ...prev, x: 0.9, y: 1.2 }));
                                
                                const fallInterval = setInterval(() => {
                                    fallVelocity += GRAVITY;
                                    fallHeight -= fallVelocity;
                                    
                                    if (fallHeight <= GROUND_Y) {
                                        fallHeight = GROUND_Y;
                                        clearInterval(fallInterval);

                                        // Squash on landing
                                        setPlayerAnimation(prev => ({ ...prev, x: 1.2, y: 0.9, eye: 10 }));
                                        setTimeout(() => {
                                            setPlayerAnimation(prev => ({ ...prev, x: 1, y: 1, eye: 0 }));
                                        }, 100);
                                    }
                                    
                                    setPlayerBottom(Math.round(fallHeight));
                                }, 16);
                                jumpIntervalRef.current = jumpInterval;
                            }, 100);
                            
                            return;
                        }
                        
                        setPlayerBottom(Math.round(currentHeight));
                    }, 16);
                    jumpIntervalRef.current = jumpInterval;
                }, 50); // Brief squash before launching
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
            const baseSpawnDelay = Math.max(1000, 3000 - (gameSpeed * 200));
            
            if (currentTime - lastSpawnTime.current >= baseSpawnDelay) {
                // Define available widths based on game speed
                let availableWidths = [32]; // Always start with smallest
                
                if (gameSpeed > 3.6) availableWidths.push(48);
                if (gameSpeed > 4.2) availableWidths.push(64, 80);
                if (gameSpeed > 4.8) availableWidths.push(96);
                
                // Pick random width from available options
                const randomWidth = availableWidths[Math.floor(Math.random() * availableWidths.length)];
                
                const newObstacle = {
                    id: currentTime,
                    position: 800,
                    height: 60,
                    width: randomWidth
                };
                setObstacles(prev => [...prev, newObstacle]);
                lastSpawnTime.current = currentTime;
            }
            
            spawnAnimationRef.current = requestAnimationFrame(checkSpawn);
        };

        spawnAnimationRef.current = requestAnimationFrame(checkSpawn);
        
        return () => {
            if (spawnAnimationRef.current) {
                cancelAnimationFrame(spawnAnimationRef.current);
            }
        };
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
                    .filter(obstacle => obstacle.position + obstacle.width > 0) // Remove when fully off-screen
            );
        };

        const moveInterval = setInterval(moveObstacles, 16);

        return () => clearInterval(moveInterval);
    }, [gameSpeed, gameOver, gameStarted]);

    // Restart Game Function
    const restartGame = () => {
        // Update high score if current score is higher
        if (score > highScore) {
            setHighScore(score);
        }

        // Cancel any ongoing spawn animations
        if (spawnAnimationRef.current) {
            cancelAnimationFrame(spawnAnimationRef.current);
        }

        setScore(0);
        setGameSpeed(SPEED);
        setObstacles([]);
        setPlayerBottom(GROUND_Y);
        lastSpawnTime.current = Date.now();
        setGameOver(false);
        setGameStarted(true);
        setPlayerAnimation({ status: 1, x: 1, y: 1, eye: 0 });
    };

    // Start Game Function
    const startGame = () => {
        setGameStarted(true);
    };

    // Body variant based on if player is beating high score
    const getBodyVariant = () => {
        if (playerAnimation.status === 0) return 'death';
        if (score > highScore) return 'kintama'; // Beating high score!
        return 'default';
    };

    const getBackgroundColors = () => {
        const variant = Math.floor(score / 200) % 6 + 1;
        
        switch(variant) {
            case 1: return { from: '#c26e1b', to: '#FBBF24' }; // Sunset
            case 2: return { from: '#164E63', to: '#0891B2' }; // Street
            case 3: return { from: '#60A5FA', to: '#FDE047' }; // Sky
            case 4: return { from: '#93C5FD', to: '#FFFFFF' }; // Snow
            case 5: return { from: '#1E1B4B', to: '#581C87' }; // Night
            case 6: return { from: '#F87171', to: '#FB923C' }; // Sunrise
            default: return { from: '#E9D5FF', to: '#C4B5FD' };
        }
    };

    const colors = getBackgroundColors();

    return (
        <motion.div
            ref={gameContainerRef} 
            className="relative w-full h-full overflow-hidden rounded-2xl"
            style={{
                background: `linear-gradient(to bottom, ${colors.from}, ${colors.to})`
            }}
            animate={{
                background: `linear-gradient(to bottom, ${colors.from}, ${colors.to})`
            }}
            transition={{
                duration: 2,
                ease: "easeInOut"
            }}
        >
            {/* Start Game */}
            {!gameStarted && (
                <div 
                    className="absolute inset-0 bg-black/90 z-40 flex items-center justify-center cursor-pointer"
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
                    className="absolute inset-0 bg-black/80 z-40 flex items-center justify-center cursor-pointer"
                    onClick={restartGame}
                >
                    <div className="text-white text-center">
                        <h1 className="text-5xl font-medium">GAME OVER</h1>
                        <p className="text-subtext">
                            {score > highScore ? "New Highscore:" : "Score:"} {score}
                        </p>
                        {score <= highScore && (
                            <p className="text-subtext">Highscore: {highScore}</p>
                        )}
                        <div className="text-sm absolute bottom-6 text-subtext left-1/2 transform -translate-x-1/2 opacity-70">Press LEFT CLICK to Restart</div>
                    </div>
                </div>
            )}

            {/* Ground */}
            <Ground
                score={score} 
                gameStarted={gameStarted}
                gameOver={gameOver}
            />
            
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
                    width={obstacle.width}
                />
            ))}

            {/* Player */}
            <motion.div
                className="absolute w-10 h-10"
                style={{ 
                    left: '80px',
                    transformOrigin: 'bottom center' // Stretch from the bottom
                }}
                animate={{
                    bottom: `${playerBottom}px`,
                    scaleX: playerAnimation.x,
                    scaleY: playerAnimation.y
                }}
                transition={{
                    duration: 0.01,
                    ease: playerBottom > 16 ? "easeOut" : "easeIn"
                }}
            >
                <PlayerSprite 
                    part="body-color"
                    variant={getBodyVariant()}
                    zIndex={1}
                />
                <PlayerSprite
                    part="body-overlay"
                    variant={getBodyVariant()}
                    zIndex={2}
                />
                <PlayerSprite
                    part="eyes"
                    variant={playerAnimation.status === 1 ? "default" : "death"}
                    zIndex={3}
                    offsetY={playerAnimation.eye}
                />
            </motion.div>

            {/* Score Display */}
            <div className="absolute top-2 right-4 flex flex-col items-center">
                <h3 className="text-heading">{score}</h3>
                <p className="text-white text-sm font-mono">HI {highScore}</p>
            </div>

            {/* Speed Indicator */}
            {/* <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-white text-xs font-mono opacity-50">
                Speed: {gameSpeed.toFixed(1)}x
                Y: {playerBottom}
            </div> */}

            {/* Dynamic Text Overlay */}
            {/* <div className="absolute top-4 left-4 text-white text-sm font-mono">
                {!isActive ? 'Jumping' : 'Release'}
            </div> */}

            {/* Instructions */}
            <div className="absolute top-4 left-4 text-white text-xs font-mono opacity-70">
                {'Press LEFT CLICK to Jump'}
            </div>
        </motion.div>
    );
};

export default JumpGame;