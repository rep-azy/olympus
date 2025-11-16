import HeroText from "../components/HeroText";
import ParallaxBg from "../components/ParallaxBg";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useMediaQuery } from "react-responsive";
import { Float, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Loader from "../components/Loader";
import { Bird } from "../components/Bird";

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 853 });

    return (
        <section className="flex items-start justify-center mmd:items-start md:justify-start min-h-screen overflow-hidden c-space">
            <HeroText />
            <ParallaxBg />
            <figure className="absolute inset-0" style={{ width: "100vw", height: "100vh" }}>
                <Canvas camera={{ position: [0, 1, 3]}}>
                    <Suspense fallback={<Loader />}>
                        <Float>
                            <Bird scale={1} position={(1.2, 0.5, 0)} />
                            <Rig />
                        </Float>
                    </Suspense>
                </Canvas>
            </figure>
        </section>
    )
};

function Rig() {
    return useFrame((state, delta) => {
        easing.damp3(state.camera.position, [state.mouse.x / 10, 1 + state.mouse.y / 10, 3], 0.5, delta);
    });
};

export default Hero;
