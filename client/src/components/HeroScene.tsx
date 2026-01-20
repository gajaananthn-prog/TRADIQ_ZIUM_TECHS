"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

import { TechIconType, FloatingTechIcon, NeuralSparkGroup } from "./TechEcosystem";

function GlassPanel({ position, rotation, scale, theme }: { position: [number, number, number], rotation: [number, number, number], scale: [number, number, number], theme: string }) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.position.y += Math.sin(time * 0.5 + position[0]) * 0.002;
        meshRef.current.rotation.x += Math.cos(time * 0.3) * 0.001;
        meshRef.current.rotation.y += Math.sin(time * 0.2) * 0.001;
    });

    return (
        <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
            <boxGeometry args={[1, 1, 0.05]} />
            <meshPhysicalMaterial
                transmission={0.95}
                thickness={0.5}
                roughness={theme === 'dark' ? 0.05 : 0.15}
                metalness={0.1}
                color={theme === 'dark' ? "#ffffff" : "#d4af37"}
                ior={1.5}
                clearcoat={1}
                attenuationDistance={1}
                attenuationColor={theme === 'dark' ? "#ffffff" : "#d4af37"}
            />
        </mesh>
    );
}

function Rig() {
    const { camera, mouse } = useThree();
    const vec = new THREE.Vector3();

    return useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 0.8, mouse.y * 0.8, 5.5), 0.05);
        camera.lookAt(0, 0, 0);
    });
}

function Scene() {
    const { theme } = useTheme();
    const panels = useMemo(() => {
        return [
            { pos: [-3, 1.5, -2] as [number, number, number], rot: [0.2, 0.4, 0] as [number, number, number], scale: [2, 1.2, 1] as [number, number, number] },
            { pos: [3, -1.5, -1] as [number, number, number], rot: [-0.3, -0.2, 0.1] as [number, number, number], scale: [1.5, 2.5, 1] as [number, number, number] },
            { pos: [-1, -2.5, -3] as [number, number, number], rot: [0.1, 0.1, 0.5] as [number, number, number], scale: [3, 2, 1] as [number, number, number] },
            { pos: [2.5, 2.5, -4] as [number, number, number], rot: [0.5, -0.4, -0.2] as [number, number, number], scale: [2.5, 1.5, 1] as [number, number, number] },
        ];
    }, []);

    const techElements = useMemo(() => [
        { type: "octahedron" as TechIconType, pos: [2.5, 1, 0] as [number, number, number], scale: 1.2, glow: true }, // Near line 1/2 right
        { type: "sphere" as TechIconType, pos: [-3, -0.5, 1] as [number, number, number], scale: 0.8, glow: true }, // Near line 3 left
        { type: "torus" as TechIconType, pos: [1.5, -2, 2] as [number, number, number], scale: 1.0, glow: false }, // Near CTA
        { type: "cube" as TechIconType, pos: [-2, 2, -1] as [number, number, number], scale: 0.6, glow: false }, // Top left
    ], []);

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
            <Rig />

            <ambientLight intensity={theme === 'dark' ? 0.3 : 0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={theme === 'dark' ? 3 : 2} color="#d4af37" />
            <pointLight position={[-10, -10, -10]} intensity={theme === 'dark' ? 1.5 : 1} color={theme === 'dark' ? "#ffffff" : "#d4af37"} />
            <rectAreaLight width={10} height={10} position={[5, 5, 5]} intensity={theme === 'dark' ? 8 : 4} color="#d4af37" />

            {panels.map((p, i) => (
                <GlassPanel key={`panel-${i}`} position={p.pos} rotation={p.rot} scale={p.scale} theme={theme} />
            ))}

            {techElements.map((el, i) => (
                <FloatingTechIcon
                    key={`tech-${i}`}
                    type={el.type}
                    position={el.pos}
                    scale={el.scale}
                    isGlow={el.glow}
                    color={theme === 'dark' ? "#d4af37" : "#b8860b"}
                />
            ))}

            <NeuralSparkGroup count={theme === 'dark' ? 30 : 15} />

            <Environment preset="city" />
        </>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 -z-10 bg-brand-background">
            <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                <Scene />
            </Canvas>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg-primary)_100%)] pointer-events-none" />
        </div>
    );
}
