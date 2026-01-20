"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Target, Shield, Layout, Globe, Cpu } from "lucide-react";
import HeroScene from "@/components/HeroScene";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { SectionDecor } from "@/components/TechEcosystem";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Neural Networks",
    description: "Deep-layer intelligence designed for high-frequency data environments."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "SaaS Ecosystems",
    description: "Hyper-scalable cloud architectures with autonomous load balancing."
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Cinematic UI",
    description: "Immersive digital interfaces engineered for the next generation of UX."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Digital Twins",
    description: "Virtual replicas of physical systems for real-time diagnostic intelligence."
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic Title Entrance logic could go here
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen">
      {/* Section 1: 3D Hero */}
      <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-48 pb-20">
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-[7rem] xl:text-[9rem] font-black mb-12 sm:mb-16 leading-[1] tracking-tighter uppercase flex flex-col items-center justify-center space-y-2 sm:space-y-4"
          >
            <span className="text-gradient block">Architecting</span>
            <span className="text-gradient block">The Neural</span>
            <span className="text-brand-gold block">Intelligence Layer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-primary/60 max-w-3xl mx-auto mb-16 font-medium tracking-wide leading-relaxed space-y-2"
          >
            <span className="block">Global neural deployments from our high-frequency Batticaloa HQ.</span>
            <span className="block">Engineering the future of autonomous software. Founded 2025.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="/dashboard" className="px-12 py-6 rounded-full brand-gradient font-black text-black flex items-center justify-center space-x-3 transition-all hover:scale-105 active:scale-95 gold-glow uppercase tracking-widest text-sm sm:text-base">
              <span>Enter Ecosystem</span>
              <ArrowRight className="w-5 h-5 font-bold" />
            </Link>
          </motion.div>
        </div>

        <HeroScene />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="relative mt-20 flex flex-col items-center space-y-4 opacity-50"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] font-black">Scroll to Explore</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-brand-gold to-transparent" />
        </motion.div>
      </section>

      {/* Section 2: Cognitive Capabilities */}
      <section className="relative py-40 px-6 max-w-7xl mx-auto">
        <div className="mb-20 relative">
          <div className="absolute -top-20 right-0 w-40 h-40 hidden lg:block">
            <Canvas dpr={[1, 2]}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={2} color="#d4af37" />
              <SectionDecor type="octahedron" position={[0, 0, 0]} />
            </Canvas>
          </div>
          <h2 className="text-xs uppercase tracking-[0.5em] font-black text-brand-gold mb-4">Capabilities</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter">COGNITIVE <span className="text-primary/20">ARCHITECTURES</span></h3>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <GlassCard className="p-10 h-full">
                <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center text-black mb-8 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-primary/50 text-base leading-relaxed group-hover:text-primary transition-colors">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Section 3: AI Focus Manifesto */}
      <section className="relative py-60 px-6 overflow-hidden bg-primary/5 flex flex-col items-center justify-center">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] opacity-20 pointer-events-none">
          <Canvas dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#f2f2f2" />
            <SectionDecor type="torus" position={[0, 0, 0]} />
          </Canvas>
        </div>
        <div className="max-w-5xl text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.1]">
            WE ARE NOT JUST BUILDING SOFTWARE. WE ARE ENABLING THE <span className="text-brand-gold">INTELLIGENCE LAYER</span> OF THE FUTURE.
          </h2>
        </div>
      </section>

      {/* Section 4: Call-to-action */}
      <section className="relative py-40 px-6 max-w-7xl mx-auto">
        <GlassCard className="p-16 md:p-32 text-center md:flex items-center justify-between border-brand-gold/20">
          <div className="text-left max-w-xl">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Experience the <br /><span className="text-gradient">TZT Ecosystem</span></h2>
            <p className="text-xl text-primary/60 mb-8">Ready to deploy high-performance neural architectures? Join the elite.</p>
          </div>
          <Link href="/dashboard" className="mt-8 md:mt-0 px-12 py-6 rounded-full brand-gradient text-black font-black uppercase tracking-widest gold-glow transition-all hover:scale-105 inline-block text-sm">
            Launch Console
          </Link>
        </GlassCard>
      </section>
    </main>
  );
}
