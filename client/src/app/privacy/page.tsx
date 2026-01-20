import type { Metadata } from "next";
import GlassCard from "@/components/GlassCard";
import { Shield, Lock, Eye, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Protocol | TRADIQ ZIUM TECHS",
    description: "Neural-grade data protection and privacy guardrails for the TZT ecosystem.",
};

export default function PrivacyPage() {
    return (
        <main className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
            <header className="mb-24 text-center max-w-4xl mx-auto">
                <h1 className="text-xs uppercase tracking-[0.8em] font-black text-brand-gold mb-6">Security Layer</h1>
                <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
                    PRIVACY <br />
                    <span className="text-brand-gold uppercase">Protocol</span>
                </h2>
                <p className="text-xl md:text-2xl text-primary/60 font-medium leading-relaxed">
                    Zero-knowledge architecture. Neural-grade encryption. <br />
                    Your data remains yours, secured by the TZT Neural Core.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                <GlassCard className="p-10 md:p-16">
                    <div className="flex items-start space-x-8">
                        <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-black shrink-0">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Data Neuralization</h3>
                            <p className="text-lg text-primary/60 leading-relaxed font-medium">
                                We do not "collect" data; we neuralize it. All user interaction nodes are processed through
                                end-to-end encrypted layers. No third-party mesh has access to your raw identity packets.
                            </p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-10 md:p-16">
                    <div className="flex items-start space-x-8">
                        <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-black shrink-0">
                            <Lock size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Zero-Persistence Policy</h3>
                            <p className="text-lg text-primary/60 leading-relaxed font-medium">
                                In our high-frequency environments, sensitive temporary data is purged via our
                                autonomous sync-cycle every 24 hours. Minimal persistence, maximum security.
                            </p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-10 md:p-16">
                    <div className="flex items-start space-x-8">
                        <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-black shrink-0">
                            <Eye size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">Transparency Node</h3>
                            <p className="text-lg text-primary/60 leading-relaxed font-medium">
                                You hold the keys to your data mesh. At any point, you can request a full pulse-report
                                of your stored attributes or initiate a complete ecosystem disconnect.
                            </p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            <footer className="mt-24 text-center opacity-40">
                <p className="text-xs font-black uppercase tracking-[0.3em]">Last Sync: January 2026 // Protocol v2.4.0</p>
            </footer>
        </main>
    );
}
