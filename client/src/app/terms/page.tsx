import type { Metadata } from "next";
import GlassCard from "@/components/GlassCard";
import { Zap, Activity, Cpu, Globe } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Sync | TRADIQ ZIUM TECHS",
    description: "Operational guidelines and governance for the ZIUM intelligence ecosystem.",
};

export default function TermsPage() {
    return (
        <main className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
            <header className="mb-24 text-center max-w-4xl mx-auto">
                <h1 className="text-xs uppercase tracking-[0.8em] font-black text-brand-gold mb-6">Governance</h1>
                <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
                    TERMS OF <br />
                    <span className="text-brand-gold uppercase">Sync</span>
                </h2>
                <p className="text-xl md:text-2xl text-primary/60 font-medium leading-relaxed">
                    By accessing the TZT Mesh, you agree to our synchronization protocols <br />
                    and neural ethical guidelines.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <GlassCard className="p-10">
                    <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-black mb-8">
                        <Activity size={24} />
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Ecosystem Access</h3>
                    <p className="text-primary/60 leading-relaxed font-medium">
                        Access to TZT high-performance nodes is granted to verified entities only.
                        Unauthorized attempts to breach the neural buffer will result in immediate permanent mesh-exclusion.
                    </p>
                </GlassCard>

                <GlassCard className="p-10">
                    <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-black mb-8">
                        <Cpu size={24} />
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Intelligence Usage</h3>
                    <p className="text-primary/60 leading-relaxed font-medium">
                        Our SaaS ecosystems are built for constructive innovation. Any use of TZT architectures
                        for destabilizing neural structures or unethical automation is strictly prohibited.
                    </p>
                </GlassCard>

                <GlassCard className="p-10">
                    <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-black mb-8">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Service Uptime</h3>
                    <p className="text-primary/60 leading-relaxed font-medium">
                        The Neural Core targets 99.99% synchronization. While we strive for zero-latency parity,
                        maintenance cycles may occur during atmospheric recalibrations.
                    </p>
                </GlassCard>

                <GlassCard className="p-10">
                    <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-black mb-8">
                        <Globe size={24} />
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Global Mesh Governance</h3>
                    <p className="text-primary/60 leading-relaxed font-medium">
                        Users must adhere to the digital laws of their local region while maintaining compliance
                        with the overarching TZT Global Intelligence Standards.
                    </p>
                </GlassCard>
            </div>

            <footer className="mt-24 text-center opacity-40">
                <p className="text-xs font-black uppercase tracking-[0.3em]">Agreement Version: Jan 2026 // Sync Protocol v1.1</p>
            </footer>
        </main>
    );
}
