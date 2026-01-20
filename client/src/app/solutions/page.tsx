import type { Metadata } from "next";
import GlassCard from "@/components/GlassCard";
import {
    Brain,
    Smartphone,
    Palette,
    Database,
    Code2,
    ArrowRight,
    Sparkles,
    Zap,
    ShieldCheck,
    Globe
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Solutions | TRADIQ ZIUM TECHS",
    description: "Enterprise-grade AI, APP, UI/UX, ERP, and Custom Software architectures by TZT.",
};

const solutionVerticals = [
    {
        title: "AI-Powered Solutions",
        icon: <Brain className="w-8 h-8" />,
        description: "Architecting neural meshes and predictive engines that transform raw data into decisive competitive advantages.",
        features: ["Neural Mesh Networks", "Predictive Analytics", "Natural Language Core"],
        accent: "from-brand-gold to-white"
    },
    {
        title: "Web & Mobile Apps",
        icon: <Smartphone className="w-8 h-8" />,
        description: "High-performance, cross-platform ecosystems designed for absolute scale and seamless user synchronization.",
        features: ["Next.js Ecosystems", "Native iOS & Android", "Real-time Sync"],
        accent: "from-blue-400 to-white"
    },
    {
        title: "UI/UX Design",
        icon: <Palette className="w-8 h-8" />,
        description: "Cinematic digital experiences that blend mathematical precision with high-end aesthetic intentionality.",
        features: ["Motion Systems", "Design Language Systems", "Interactive Prototyping"],
        accent: "from-purple-400 to-white"
    },
    {
        title: "POS & ERP Systems",
        icon: <Database className="w-8 h-8" />,
        description: "Intelligent enterprise resource management layers that unify commerce, logistics, and data in one glass plane.",
        features: ["Neural ERP", "Cloud POS Nodes", "Inventory Intelligence"],
        accent: "from-emerald-400 to-white"
    },
    {
        title: "Custom Software",
        icon: <Code2 className="w-8 h-8" />,
        description: "Tailored neural-logic software built from the ground up for unique, high-stakes business requirements.",
        features: ["Legacy Transformation", "Custom API Meshes", "Secure Architecture"],
        accent: "from-orange-400 to-white"
    }
];

export default function SolutionsPage() {
    return (
        <main className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
            <header className="mb-24 text-center max-w-4xl mx-auto">
                <h1 className="text-xs uppercase tracking-[0.8em] font-black text-brand-gold mb-6">Verticals</h1>
                <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
                    ENGINEERING THE <br />
                    <span className="text-brand-gold uppercase">Future Layer</span>
                </h2>
                <p className="text-xl md:text-2xl text-primary/60 font-medium leading-relaxed">
                    From neural architectures to global commerce systems—we build the
                    underlying intelligence that powers the world's most innovative teams.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {solutionVerticals.map((vertical, index) => (
                    <GlassCard key={index} className={index === 0 ? "md:col-span-2 p-12 md:p-20" : "p-12"}>
                        <div className="flex flex-col h-full">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${vertical.accent} flex items-center justify-center text-black mb-10 group-hover:scale-110 transition-transform shadow-lg shadow-black/20`}>
                                {vertical.icon}
                            </div>

                            <div className="max-w-2xl">
                                <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">{vertical.title}</h3>
                                <p className="text-lg md:text-xl text-primary/60 mb-10 leading-relaxed font-medium">
                                    {vertical.description}
                                </p>

                                <div className="flex flex-wrap gap-4 mb-12">
                                    {vertical.features.map((feature, fIndex) => (
                                        <div key={fIndex} className="px-4 py-2 rounded-full glass-pill text-xs font-black uppercase tracking-widest flex items-center space-x-2">
                                            <Sparkles className="w-3 h-3 text-brand-gold" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center space-x-3 text-sm font-black uppercase tracking-[0.2em] group/link text-brand-gold"
                                >
                                    <span>Build This Stack</span>
                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>

            {/* Trust Section */}
            <section className="mt-40 border-t border-white/10 pt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 opacity-50">
                    <TrustComponent icon={<Zap size={20} />} title="High Flux" value="Performance verified at absolute scale." />
                    <TrustComponent icon={<ShieldCheck size={20} />} title="Total Security" value="Neural encryption on every packet." />
                    <TrustComponent icon={<Globe size={20} />} title="Global Mesh" value="Deployed across 24 edge regions." />
                </div>
            </section>
        </main>
    );
}

function TrustComponent({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
    return (
        <div className="flex flex-col space-y-4">
            <div className="text-brand-gold">{icon}</div>
            <p className="text-sm font-black uppercase tracking-widest">{title}</p>
            <p className="text-sm text-primary/80 leading-relaxed font-medium">{value}</p>
        </div>
    );
}
