"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    PerspectiveCamera,
    Environment,
    ContactShadows,
    Extrude,
    Float
} from "@react-three/drei";
import * as THREE from "three";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

function HeartShape({ position }: { position: [number, number, number] }) {
    const heartRef = useRef<THREE.Group>(null!);

    const shape = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(0, 0);
        s.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
        s.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
        s.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
        s.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);
        return s;
    }, []);

    const extrudeSettings = {
        depth: 0.2,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 2,
        bevelSize: 0.1,
        bevelThickness: 0.1
    };

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (heartRef.current) {
            heartRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.15;
            heartRef.current.rotation.y = Math.sin(t * 0.8) * 0.3;
            heartRef.current.rotation.z = Math.cos(t * 0.5) * 0.1;
        }
    });

    return (
        <group ref={heartRef} position={position} rotation={[Math.PI, 0, 0]} scale={0.25}>
            <Extrude args={[shape, extrudeSettings]}>
                <meshStandardMaterial
                    color="#ff1493"
                    emissive="#ff00ff"
                    emissiveIntensity={1.5}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Extrude>
            <pointLight intensity={1} distance={2} color="#ff00ff" />
        </group>
    );
}

function ZiumModel({ isHovered, isWaving, isAtAboutSection }: { isHovered: boolean, isWaving: boolean, isAtAboutSection?: boolean }) {
    const groupRef = useRef<THREE.Group>(null!);
    const rightHandRef = useRef<THREE.Group>(null!);
    const coreRef = useRef<THREE.Mesh>(null!);
    const iconRef = useRef<THREE.Group>(null!);
    const eyesRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        const group = groupRef.current;
        const rightHand = rightHandRef.current;
        const core = coreRef.current;
        const icon = iconRef.current;
        const eyes = eyesRef.current;

        if (!group) return;

        const t = state.clock.getElapsedTime();

        // Anti-gravity floating
        group.position.y = Math.sin(t * 0.8) * 0.15;
        const scale = 1 + Math.sin(t * 1.5) * 0.02;
        group.scale.set(scale, scale, scale);

        // Subtle realistic rotation (Calm & Intelligent)
        // group.rotation.y += 0.003; 
        group.rotation.z = Math.sin(t * 0.5) * 0.04;

        // Cute Eye Blink Animation
        if (eyes) {
            const blinkT = t % 4; // Blink every 4 seconds
            const eyeScaleY = blinkT > 3.85 ? 0.1 : 1;
            eyes.scale.y = THREE.MathUtils.lerp(eyes.scale.y, eyeScaleY, 0.2);
        }

        // Soft breathing/pulsing glow
        if (core) {
            const pulseSpeed = isAtAboutSection ? 4 : 2;
            const corePulse = 0.9 + Math.sin(t * pulseSpeed) * 0.05;
            core.scale.set(corePulse, corePulse, corePulse);
            if (core.material instanceof THREE.MeshStandardMaterial) {
                const baseIntensity = isAtAboutSection ? 4 : 2;
                core.material.emissiveIntensity = baseIntensity + Math.sin(t * pulseSpeed) * (isAtAboutSection ? 3 : 1.5);
            }
        }

        // Guiding Icon interaction
        if (icon) {
            const iconTargetScale = isHovered ? 0.4 : 0;
            icon.scale.set(
                THREE.MathUtils.lerp(icon.scale.x, iconTargetScale, 0.1),
                THREE.MathUtils.lerp(icon.scale.y, iconTargetScale, 0.1),
                THREE.MathUtils.lerp(icon.scale.z, iconTargetScale, 0.1)
            );
            icon.position.y = 1.3 + Math.sin(t * 2) * 0.1;
            icon.rotation.y = t * 2;
        }

        // Waving Animation
        if (isWaving && rightHand) {
            rightHand.rotation.z = Math.sin(t * 12) * 0.6;
            rightHand.position.y = 0.3 + Math.sin(t * 12) * 0.15;
            rightHand.position.x = 1.0;
        } else if (rightHand) {
            const targetX = isHovered ? 1.0 : 0.85;
            const targetY = isHovered ? 0.3 : 0.1;
            const targetZ = isHovered ? 0.4 : 0;
            rightHand.rotation.z = THREE.MathUtils.lerp(rightHand.rotation.z, targetZ, 0.1);
            rightHand.position.y = THREE.MathUtils.lerp(rightHand.position.y, targetY, 0.1);
            rightHand.position.x = THREE.MathUtils.lerp(rightHand.position.x, targetX, 0.1);
        }

        // Interaction lean
        if (isHovered) {
            group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, 0.25, 0.1);
        } else {
            group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, 0, 0.1);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Fresnel Aura / Glow Layer */}
            <mesh position={[0, 0.3, 0]} scale={1.05}>
                <capsuleGeometry args={[0.65, 0.7, 6, 24]} />
                <meshBasicMaterial
                    color="#00ffff"
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Body: Refined Capsule Shape - Glassmorphic */}
            <mesh position={[0, 0.3, 0]}>
                <capsuleGeometry args={[0.65, 0.7, 6, 24]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    transmission={0.7}
                    thickness={1.5}
                    roughness={0.05}
                    ior={1.5}
                    clearcoat={1}
                    attenuationDistance={0.5}
                    attenuationColor="#ffccdd"
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Glowing Circuits / Rings */}
            <group position={[0, 0.3, 0]}>
                <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2.2, 0, 0]}>
                    <torusGeometry args={[0.66, 0.005, 12, 48]} />
                    <meshBasicMaterial color="#00f2ff" transparent opacity={0.4} />
                </mesh>
                <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 1.8, 0, 0.2]}>
                    <torusGeometry args={[0.66, 0.005, 12, 48]} />
                    <meshBasicMaterial color="#00f2ff" transparent opacity={0.3} />
                </mesh>
            </group>

            {/* Glowing Core */}
            <mesh ref={coreRef}>
                <sphereGeometry args={[0.3, 24, 24]} />
                <meshStandardMaterial
                    emissive="#ff00ff"
                    emissiveIntensity={4}
                    color="#ff69b4"
                />
                <pointLight intensity={2} distance={4} color="#00ffff" />
            </mesh>

            {/* Face */}
            <group position={[0, 0.5, 0.62]}>
                {/* Eyes Group for Blinking */}
                <group ref={eyesRef}>
                    <mesh position={[-0.18, 0.1, 0]}>
                        <sphereGeometry args={[0.06, 16, 16]} />
                        <meshBasicMaterial color="#ffffff" />
                    </mesh>
                    <mesh position={[0.18, 0.1, 0]}>
                        <sphereGeometry args={[0.06, 16, 16]} />
                        <meshBasicMaterial color="#ffffff" />
                    </mesh>
                </group>
                {/* Fixed Smile: Rotate properly to arc upwards */}
                <mesh position={[0, -0.08, 0]} rotation={[Math.PI + 0.1, 0, 0]}>
                    <torusGeometry args={[0.08, 0.015, 16, 32, Math.PI]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
            </group>

            {/* Hands */}
            <group position={[-0.85, 0.1, 0]}>
                <mesh scale={[1, 1.3, 0.8]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        transmission={0.5}
                        roughness={0.1}
                    />
                </mesh>
            </group>
            <group ref={rightHandRef} position={[0.85, 0.1, 0]}>
                <mesh scale={[1, 1.3, 0.8]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        transmission={0.5}
                        roughness={0.1}
                    />
                </mesh>
            </group>

            {/* Floating Heart */}
            <HeartShape position={[0.7, 1.3, 0.2]} />

            {/* Guiding Icon - Briefly appears on interaction */}
            <group ref={iconRef} position={[0, 1.5, 0]} scale={0}>
                <mesh>
                    <octahedronGeometry args={[0.3, 0]} />
                    <meshStandardMaterial color="#00f2ff" emissive="#00ffff" emissiveIntensity={2} wireframe />
                </mesh>
                <pointLight intensity={1} color="#00ffff" />
            </group>
        </group>
    );
}

export default function Zium3DCompanion({ onIntroComplete }: { onIntroComplete?: () => void }) {
    // Voice configurations
    const speechQueue = useRef<string[]>([]);
    const hasInteracted = useRef(false);

    const speak = (text: string) => {
        if (typeof window === "undefined") return;

        // Browsers block audio until user interaction
        if (!hasInteracted.current) {
            // Avoid duplicate messages in the queue
            if (!speechQueue.current.includes(text)) {
                speechQueue.current.push(text);
            }

            const handleFirstInteraction = () => {
                if (hasInteracted.current) return;
                hasInteracted.current = true;

                // Ensure audio context is resumed
                if (window.speechSynthesis) window.speechSynthesis.resume();

                // Process the queue
                speechQueue.current.forEach((msg, index) => {
                    setTimeout(() => initiateSpeech(msg), index * 1000);
                });
                speechQueue.current = [];

                window.removeEventListener("click", handleFirstInteraction);
                window.removeEventListener("touchstart", handleFirstInteraction);
                window.removeEventListener("keydown", handleFirstInteraction);
            };

            window.addEventListener("click", handleFirstInteraction, { once: true });
            window.addEventListener("touchstart", handleFirstInteraction, { once: true });
            window.addEventListener("keydown", handleFirstInteraction, { once: true });
            return;
        }

        initiateSpeech(text);
    };

    const initiateSpeech = (text: string) => {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        if (voices.length === 0) {
            const onVoicesChanged = () => {
                const updatedVoices = synth.getVoices();
                performSpeak(text, updatedVoices, synth);
                synth.onvoiceschanged = null;
            };
            synth.onvoiceschanged = onVoicesChanged;
        } else {
            performSpeak(text, voices, synth);
        }
    };

    const performSpeak = (text: string, voices: SpeechSynthesisVoice[], synth: SpeechSynthesis) => {
        const utterance = new SpeechSynthesisUtterance(text);
        const preferredVoice = voices.find(v =>
            v.name.includes("Google UK English Female") ||
            v.name.includes("Zora") ||
            v.name.includes("Zira") ||
            v.lang.startsWith("en-GB")
        ) || voices.find(v => v.lang.startsWith("en-US")) || voices[0];

        if (preferredVoice) utterance.voice = preferredVoice;
        utterance.pitch = 1.3; // Slightly lower pitch for better clarity
        utterance.rate = 0.9;  // Slightly faster / more natural
        utterance.volume = 1.0; // Max volume

        synth.speak(utterance);
    };

    const [isHovered, setIsHovered] = useState(false);
    const [isWaving, setIsWaving] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showGreetingText, setShowGreetingText] = useState(false);
    const [isAtAboutSection, setIsAtAboutSection] = useState(false);
    const [showSectionGreeting, setShowSectionGreeting] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const controls = useAnimation();
    const pathname = usePathname();

    // Reset ZIUM position on route change
    useEffect(() => {
        setIsAtAboutSection(false);
        setShowSectionGreeting(false);
        setIsWaving(false);
    }, [pathname]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const sequence = async () => {
            // 1. Initial Position (Hide off-screen top-left)
            await controls.start({
                top: "10%",
                left: "-20%",
                scale: 1.0,
                opacity: 0,
                transition: { duration: 0 }
            });

            // 2. Cinematic Fly-in to Center
            await controls.start({
                top: isMobile ? "40%" : "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                opacity: 1,
                transition: {
                    duration: 1.8,
                    ease: [0.22, 1, 0.36, 1], // Quart ease out
                }
            });

            // 3. Greeting Ceremony in Center
            setIsWaving(true);
            setShowGreetingText(true);
            speak("Welcome to the TRADIQ ZIUM!");
            await new Promise(resolve => setTimeout(resolve, 3000)); // 3 seconds delay

            // 4. Usher in Home Content
            setShowGreetingText(false);
            setIsLoading(false);
            document.body.setAttribute("data-zium-intro", "done");
            if (onIntroComplete) onIntroComplete();

            await new Promise(resolve => setTimeout(resolve, 800));
            setIsWaving(false);

            // 5. Drift to Resting Corner
            setIsIdle(true);
            await controls.start({
                top: isMobile ? "calc(100vh - 160px)" : "calc(100vh - 200px)",
                left: isMobile ? "calc(100vw - 120px)" : "calc(100vw - 150px)",
                x: "0%",
                y: "0%",
                scale: isMobile ? 0.7 : 0.8,
                transition: { duration: 2.5, ease: [0.4, 0, 0.2, 1] }
            });
        };

        sequence();
    }, [controls, onIntroComplete]);

    useEffect(() => {
        const handleSectionActive = (e: any) => {
            setIsAtAboutSection(e.detail.active);
        };
        window.addEventListener("zium-active-section", handleSectionActive);
        return () => window.removeEventListener("zium-active-section", handleSectionActive);
    }, []);

    useEffect(() => {
        if (isLoading || !isIdle) return;

        const triggerSectionMove = async () => {
            if (isAtAboutSection) {
                // Fly to About Section position
                setShowSectionGreeting(true);
                setIsWaving(true);
                speak("Hi, I am ZIUM ALPHA!");
                await controls.start({
                    top: isMobile ? "30%" : "50%",
                    left: isMobile ? "50%" : "65%",
                    x: "-50%",
                    y: "-50%",
                    scale: isMobile ? 0.9 : 1.0,
                    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
                });
            } else {
                // Return to Resting Corner
                setShowSectionGreeting(false);
                setIsWaving(false);
                await controls.start({
                    top: isMobile ? "calc(100vh - 160px)" : "calc(100vh - 200px)",
                    left: isMobile ? "calc(100vw - 120px)" : "calc(100vw - 150px)",
                    x: "0%",
                    y: "0%",
                    scale: isMobile ? 0.7 : 0.8,
                    transition: { duration: 1.5, ease: [0.4, 0, 0.2, 1] }
                });
            }
        };

        triggerSectionMove();
    }, [isAtAboutSection, isLoading, isIdle, controls]);

    return (
        <>
            {/* Branded Loading Ceremony */}
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
                        className="fixed inset-0 z-[998] bg-black/90 backdrop-blur-3xl flex items-center justify-center overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px]" />
                        <div className="relative flex flex-col items-center text-center px-6">
                            <AnimatePresence>
                                {showGreetingText && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="flex flex-col items-center gap-8 mt-[55vh] md:mt-48"
                                    >
                                        <div className="space-y-4">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="h-[1px] w-12 bg-brand-gold opacity-50" />
                                                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                                                    Hi, I am your <span className="text-brand-gold">ZIUM</span>!
                                                </h1>
                                                <div className="h-[1px] w-24 bg-brand-gold opacity-50" />
                                            </div>
                                            <p className="text-[10px] font-black tracking-[0.8em] text-white/40 uppercase">
                                                Initializing Ecosystem
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Logo in top corner during intro */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center space-x-4"
                            >
                                <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center text-black font-black text-2xl shadow-xl shadow-brand-gold/10">
                                    T
                                </div>
                                <span className="font-black text-lg tracking-[0.2em] uppercase text-white/50">Tradiq Zium</span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                animate={controls}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="fixed z-[999] cursor-pointer pointer-events-auto"
                style={{ width: "150px", height: "200px" }}
            >
                <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={38} />
                    <ambientLight intensity={0.7} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2.5} />
                    <pointLight position={[-8, 5, -5]} intensity={1.5} color="#00ffff" />

                    <ZiumModel isHovered={isHovered} isWaving={isWaving} isAtAboutSection={isAtAboutSection} />

                    <ContactShadows
                        position={[0, -1.6, 0]}
                        opacity={0.3}
                        blur={2.5}
                        scale={6}
                        color="#ff00ff"
                    />

                    <Environment preset="night" />
                </Canvas>

                <AnimatePresence>
                    {isIdle && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.5, y: 0 }}
                            className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                        >
                            <span className="text-[5.5px] font-black tracking-[0.5em] text-brand-gold uppercase">I am ZIUM!</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showSectionGreeting && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 10 }}
                            className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none"
                        >
                            <div className="px-4 py-2 rounded-2xl brand-gradient text-black font-black text-sm gold-glow whitespace-nowrap">
                                I&apos;m ZIUM!
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
