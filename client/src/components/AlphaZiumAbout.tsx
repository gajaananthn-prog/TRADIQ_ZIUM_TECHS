"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import GlassCard from "./GlassCard";

export default function AlphaZiumAbout() {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2 });

    useEffect(() => {
        const event = new CustomEvent("zium-active-section", {
            detail: { active: isInView }
        });
        window.dispatchEvent(event);

        return () => {
            const cleanupEvent = new CustomEvent("zium-active-section", {
                detail: { active: false }
            });
            window.dispatchEvent(cleanupEvent);
        };
    }, [isInView]);

    return (
        <section ref={ref} className="relative py-40 px-6 max-w-7xl mx-auto overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-xs uppercase tracking-[0.5em] font-black text-brand-gold mb-4">Companion Layer</h2>
                        <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                            MEET YOUR <br />
                            <span className="text-gradient">INTELLIGENT DIGITAL</span> <br />
                            COMPANION
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <p className="text-lg md:text-xl text-primary/70 leading-relaxed font-medium">
                            <span className="text-white font-bold">Alpha ZIUM</span> is our calm, intelligent, and friendly brand companion.
                            He helps users navigate the website seamlessly, providing subtle guidance and support.
                            Calm, curious, and approachable, Alpha ZIUM ensures a smooth and effortless experience for all our clients.
                        </p>

                        <GlassCard className="p-8 border-brand-pink/20 bg-brand-pink/5">
                            <h4 className="text-brand-pink font-black text-xs uppercase tracking-widest mb-4">Future Evolution</h4>
                            <p className="text-sm md:text-base text-primary/60 leading-relaxed">
                                <span className="text-brand-gold font-bold">NOVA</span> and <span className="text-brand-gold font-bold">QUANTUM</span> will arrive soon,
                                equipped with advanced assistance features, intuitive guidance, and enhanced interactivity taking user support and engagement to the next level.
                            </p>
                        </GlassCard>
                    </motion.div>
                </div>

                <div className="hidden lg:block relative h-[400px]">
                    {/* This div acts as the visual anchor/resting spot for ZIUM when he flies in */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-64 rounded-full bg-brand-gold/5 blur-3xl animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
}
