"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, Globe, Mail, Phone, Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
    solutions: [
        { name: "Neural Networks", href: "/solutions#neural" },
        { name: "SaaS Ecosystems", href: "/solutions#saas" },
        { name: "Cinematic UI", href: "/solutions#ui" },
        { name: "Digital Twins", href: "/solutions#twins" },
    ],
    company: [
        { name: "About Node", href: "/about" },
        { name: "Batti HQ", href: "/about#hq" },
        { name: "Intelligence Mesh", href: "/about#mesh" },
        { name: "Contact Secure", href: "/about#contact" },
    ],
    legal: [
        { name: "Privacy Protocol", href: "/privacy" },
        { name: "Terms of Sync", href: "/terms" },
        { name: "Security Audit", href: "/security" },
    ]
};

export default function Footer() {
    return (
        <footer className="relative pt-32 pb-16 px-6 overflow-hidden border-t border-white/5 bg-[#050505] text-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Identity */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center space-x-3 group w-fit">
                            <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center text-black font-black text-xl shadow-lg shadow-brand-gold/20">
                                T
                            </div>
                            <span className="font-black text-xl tracking-tighter uppercase text-white">Tradiq Zium</span>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs font-medium">
                            Architecting the neural intelligence layer of the future. Global neural deployments from Batticaloa HQ. Founded 2025.
                        </p>
                        <div className="flex items-center space-x-4">
                            <SocialIcon icon={<Twitter size={18} />} href="#" />
                            <SocialIcon icon={<Linkedin size={18} />} href="#" />
                            <SocialIcon icon={<Github size={18} />} href="#" />
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.3em] font-black text-brand-gold mb-8">Solutions</h4>
                        <ul className="space-y-4">
                            {footerLinks.solutions.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/60 hover:text-brand-gold transition-colors text-sm font-bold uppercase tracking-widest">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs uppercase tracking-[0.3em] font-black text-brand-gold mb-8">Company</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/60 hover:text-brand-gold transition-colors text-sm font-bold uppercase tracking-widest">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs uppercase tracking-[0.3em] font-black text-brand-gold mb-8">Contact Nodes</h4>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4 text-white/60 group">
                                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                                    <Mail size={16} />
                                </div>
                                <span className="text-xs font-black tracking-widest uppercase break-all">BitAura2025@gmail.com</span>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center space-x-4 text-white/60 group">
                                    <div className="w-8 h-8 rounded-lg glass flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                                        <Phone size={16} />
                                    </div>
                                    <span className="text-xs font-black tracking-widest uppercase">+94 760 767 506</span>
                                </div>
                                <div className="flex items-center space-x-4 text-white/60 group ml-12">
                                    <span className="text-xs font-black tracking-widest uppercase">+94 789 295 665</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 text-white/60 group">
                                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                                    <Globe size={16} />
                                </div>
                                <span className="text-xs font-black tracking-widest uppercase">Batticaloa • Sri Lanka</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-white/20">
                    <p className="text-[10px] font-black tracking-[0.5em] uppercase">
                        © 2026 TRADIQ ZIUM TECHS. NEURAL CORE SECURED.
                    </p>
                    <div className="flex space-x-8">
                        {footerLinks.legal.map((link) => (
                            <Link key={link.name} href={link.href} className="text-[10px] font-black tracking-widest uppercase hover:text-brand-gold transition-colors">{link.name}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <Link href={href} className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-brand-gold hover:border-brand-gold/30 transition-all">
            {icon}
        </Link>
    );
}
