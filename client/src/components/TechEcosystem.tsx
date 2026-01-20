"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

export type TechIconType = "cube" | "sphere" | "torus" | "octahedron" | "spark";

interface FloatingTechIconProps {
    type: TechIconType;
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    color?: string;
    isGlow?: boolean;
}

export function FloatingTechIcon({
    type,
    position,
    rotation = [0, 0, 0],
    scale = 1,
    color = "#d4af37",
    isGlow = false
}: FloatingTechIconProps) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Complex floating animation
        meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.2;
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.008;

        if (isGlow && meshRef.current.material instanceof THREE.MeshStandardMaterial) {
            meshRef.current.material.emissiveIntensity = 1 + Math.sin(t * 2) * 0.5;
        }
    });

    const geometry = useMemo(() => {
        switch (type) {
            case "cube": return <boxGeometry args={[0.5, 0.5, 0.5]} />;
            case "sphere": return <sphereGeometry args={[0.3, 32, 32]} />;
            case "torus": return <torusGeometry args={[0.3, 0.05, 16, 32]} />;
            case "octahedron": return <octahedronGeometry args={[0.4, 0]} />;
            case "spark": return <sphereGeometry args={[0.05, 16, 16]} />;
            default: return <boxGeometry args={[0.5, 0.5, 0.5]} />;
        }
    }, [type]);

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh
                ref={meshRef}
                position={position}
                rotation={rotation}
                scale={scale}
            >
                {geometry}
                {type === "sphere" ? (
                    <MeshDistortMaterial
                        color={color}
                        speed={2}
                        distort={0.4}
                        radius={1}
                        emissive={color}
                        emissiveIntensity={isGlow ? 1 : 0.2}
                        metalness={0.9}
                        roughness={0.1}
                    />
                ) : type === "cube" ? (
                    <MeshWobbleMaterial
                        color={color}
                        speed={1}
                        factor={0.4}
                        metalness={0.9}
                        roughness={0.1}
                        emissive={color}
                        emissiveIntensity={0.1}
                    />
                ) : (
                    <meshStandardMaterial
                        color={color}
                        metalness={0.9}
                        roughness={0.1}
                        emissive={color}
                        emissiveIntensity={isGlow ? 2 : 0.1}
                    />
                )}
            </mesh>
        </Float>
    );
}

export function NeuralSparkGroup({ count = 20, area = [10, 10, 5] }: { count?: number, area?: [number, number, number] }) {
    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < count; i++) {
            p.push({
                pos: [
                    (Math.random() - 0.5) * area[0],
                    (Math.random() - 0.5) * area[1],
                    (Math.random() - 0.5) * area[2]
                ] as [number, number, number],
                scale: Math.random() * 0.3 + 0.1
            });
        }
        return p;
    }, [count, area]);

    return (
        <group>
            {points.map((p, i) => (
                <FloatingTechIcon
                    key={i}
                    type="spark"
                    position={p.pos}
                    scale={p.scale}
                    color="#d4af37"
                    isGlow
                />
            ))}
        </group>
    );
}

export function SectionDecor({ type, position }: { type: TechIconType, position: [number, number, number] }) {
    return (
        <group position={position}>
            <FloatingTechIcon
                type={type}
                position={[0, 0, 0]}
                scale={1.5}
                isGlow
                color="#d4af37"
            />
            <pointLight intensity={2} color="#d4af37" distance={5} />
        </group>
    );
}
