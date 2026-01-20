import type { Metadata } from "next";
import GlassCard from "@/components/GlassCard";
import ContactForm from "@/components/ContactForm";
import AlphaZiumAbout from "@/components/AlphaZiumAbout";
import {
    Building2,
    Target,
    MapPin,
    Mail,
    Phone,
    Globe,
    Users2,
    Calendar
} from "lucide-react";

export const metadata: Metadata = {
    title: "About & Contact | TRADIQ ZIUM TECHS",
    description: "Our vision, our mission, and our physical headquarters in Batticaloa.",
};

export default function AboutPage() {
    return (
        <main className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
            {/* Hero Section */}
            <header className="mb-32 text-center max-w-4xl mx-auto">
                <h1 className="text-xs uppercase tracking-[0.8em] font-black text-brand-gold mb-6">Our DNA</h1>
                <h2 className="text-4xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
                    THE ARCHITECTS OF <br />
                    <span className="text-brand-gold uppercase">Aesthetics</span>
                </h2>
                <p className="text-xl md:text-2xl text-primary/60 font-medium leading-relaxed">
                    TRADIQ ZIUM TECHS (TZT) is a global software collective dedicated to building the bridge
                    between advanced neural logic and cinematic human experience. Founded in Batticaloa, Sri Lanka in 2025.
                </p>
            </header>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-40">
                <GlassCard className="p-12 md:p-16">
                    <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-black mb-8">
                        <Target size={24} />
                    </div>
                    <h3 className="text-3xl font-black mb-6 tracking-tight uppercase">The Vision</h3>
                    <p className="text-lg text-primary/60 leading-relaxed font-medium">
                        To define the aesthetic standards of the AI era, ensuring that every digital
                        interaction feels intentional, elite, and profoundly human.
                    </p>
                </GlassCard>

                <GlassCard className="p-12 md:p-16">
                    <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-black mb-8">
                        <Building2 size={24} />
                    </div>
                    <h3 className="text-3xl font-black mb-6 tracking-tight uppercase">The Mission</h3>
                    <p className="text-lg text-primary/60 leading-relaxed font-medium">
                        Providing enterprise-grade neural architectures that empower businesses
                        to operate at the intersection of absolute efficiency and premium design.
                    </p>
                </GlassCard>
            </div>

            {/* Alpha ZIUM Companion Section */}
            <AlphaZiumAbout />

            {/* Regional Highlight: Batticaloa */}
            <section className="mb-40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7">
                        <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-8 uppercase">A Global Hub in <br /><span className="text-brand-gold uppercase">Batticaloa</span></h2>
                        <div className="space-y-6 text-xl text-primary/60 font-medium leading-relaxed">
                            <p>
                                Our regional headquarters in <span className="text-brand-gold font-bold">Batticaloa, Sri Lanka</span>, serves as a key node
                                in our global intelligence mesh.
                            </p>
                            <p>
                                Here, our lead architects work in a state-of-the-art glass facility,
                                leveraging local talent to build software that competes on the world's
                                most demanding stages.
                            </p>
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <GlassCard className="p-10 border-brand-gold/10 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold opacity-10 blur-3xl rounded-full" />
                            <div className="relative z-10 space-y-8">
                                <LocationStat icon={<MapPin size={20} />} label="Regional HQ" value="Batticaloa, SL" />
                                <LocationStat icon={<Calendar size={20} />} label="Operational" value="Since 2025" />
                                <LocationStat icon={<Building2 size={20} />} label="Founders" value="2 Architects" />
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="pt-20 border-t border-primary/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-8 uppercase">Let's Build the <br /><span className="text-brand-gold uppercase">Intelligence</span></h2>
                        <p className="text-xl text-primary/60 font-medium leading-relaxed mb-12">
                            Ready to deploy your next neural architecture? <br />
                            Secure a consultation with our design leads.
                        </p>
                        <div className="space-y-6">
                            <ContactLink icon={<Mail size={18} />} label="Inquiries" value="BitAura2025@gmail.com" />
                            <div className="space-y-4">
                                <ContactLink icon={<Phone size={18} />} label="Direct Link 01" value="+94 760 767 506" />
                                <ContactLink icon={<Phone size={18} />} label="Direct Link 02" value="+94 789 295 665" />
                            </div>
                            <ContactLink icon={<Globe size={18} />} label="Mesh Network" value="Global" />
                        </div>
                    </div>

                    <div className="relative">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </main>
    );
}

function LocationStat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-center space-x-6 group/stat">
            <div className="w-10 h-10 rounded-lg glass flex items-center justify-center text-brand-gold transition-transform group-hover/stat:scale-110">
                {icon}
            </div>
            <div>
                <p className="text-[10px] uppercase tracking-widest font-black opacity-50 mb-1">{label}</p>
                <p className="text-xl font-black tracking-tight">{value}</p>
            </div>
        </div>
    );
}

function ContactLink({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-center space-x-6">
            <div className="w-10 h-10 rounded-lg glass flex items-center justify-center text-brand-gold">
                {icon}
            </div>
            <div>
                <p className="text-[10px] uppercase tracking-widest font-black opacity-50 mb-0.5">{label}</p>
                <p className="text-lg font-bold tracking-tight">{value}</p>
            </div>
        </div>
    );
}
