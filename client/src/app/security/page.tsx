import type { Metadata } from "next";
import GlassCard from "@/components/GlassCard";
import { ShieldCheck, HardDrive, Cpu, Terminal } from "lucide-react";

export const metadata: Metadata = {
    title: "Security Audit | TRADIQ ZIUM TECHS",
    description: "Real-time security metrics and neural integrity reports for the TZT platform.",
};

export default function SecurityPage() {
    return (
        <main className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
            <header className="mb-24 text-center max-w-4xl mx-auto">
                <h1 className="text-xs uppercase tracking-[0.8em] font-black text-brand-gold mb-6">Integrity Check</h1>
                <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
                    SECURITY <br />
                    <span className="text-brand-gold uppercase">Audit</span>
                </h2>
                <p className="text-xl md:text-2xl text-primary/60 font-medium leading-relaxed">
                    Continuous neural monitoring. Real-time threat neutralization. <br />
                    The TZT Ecosystem is hardened against the future.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <div className="text-center p-8 border border-white/5 rounded-3xl bg-white/[0.02]">
                    <div className="text-brand-gold font-black text-5xl mb-2">99.9%</div>
                    <div className="text-[10px] uppercase tracking-widest opacity-40 font-black">Neural Integrity</div>
                </div>
                <div className="text-center p-8 border border-white/5 rounded-3xl bg-white/[0.02]">
                    <div className="text-brand-gold font-black text-5xl mb-2">0.02ms</div>
                    <div className="text-[10px] uppercase tracking-widest opacity-40 font-black">Threat Response</div>
                </div>
                <div className="text-center p-8 border border-white/5 rounded-3xl bg-white/[0.02]">
                    <div className="text-brand-gold font-black text-5xl mb-2">256-Bit</div>
                    <div className="text-[10px] uppercase tracking-widest opacity-40 font-black">Quantum Encryption</div>
                </div>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto">
                <GlassCard className="p-10">
                    <div className="flex items-center space-x-6 mb-6">
                        <Terminal className="text-brand-gold" size={24} />
                        <h3 className="text-2xl font-black tracking-tight uppercase">Protocol: Neural-Shield</h3>
                    </div>
                    <p className="text-primary/60 leading-relaxed font-medium">
                        Our proprietary shield logic analyzes every incoming packet using predictive AI.
                        Malicious nodes are identified and siloed before they reach the core server mesh.
                    </p>
                </GlassCard>

                <GlassCard className="p-10">
                    <div className="flex items-center space-x-6 mb-6">
                        <Cpu className="text-brand-gold" size={24} />
                        <h3 className="text-2xl font-black tracking-tight uppercase">Hardware-Level Parity</h3>
                    </div>
                    <p className="text-primary/60 leading-relaxed font-medium">
                        TZT clusters are built on dedicated hardware with isolated memory channels.
                        We don't just secure the software; we secure the silicon.
                    </p>
                </GlassCard>

                <GlassCard className="p-10">
                    <div className="flex items-center space-x-6 mb-6">
                        <ShieldCheck className="text-brand-gold" size={24} />
                        <h3 className="text-2xl font-black tracking-tight uppercase">Independent Verifications</h3>
                    </div>
                    <p className="text-primary/60 leading-relaxed font-medium">
                        Quarterly deep-sync audits are performed by top-tier autonomous security agents To ensure
                        no drift occurs in our zero-trust implementation.
                    </p>
                </GlassCard>
            </div>

            <footer className="mt-24 text-center opacity-40">
                <p className="text-xs font-black uppercase tracking-[0.3em]">System Status: NOMINAL // Secure Node Connected</p>
            </footer>
        </main>
    );
}
