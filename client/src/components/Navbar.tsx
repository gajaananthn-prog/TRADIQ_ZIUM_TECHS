"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, Cpu, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/solutions" },
    { name: "About", href: "/about" },
];

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Close menu on navigation
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-6",
                scrolled ? "py-4" : "py-8"
            )}
        >
            <div className="w-full max-w-7xl mx-auto">
                <div className={cn(
                    "glass rounded-full px-4 md:px-8 py-2 md:py-4 flex items-center justify-between transition-all duration-300 border-white/5 shadow-2xl",
                    scrolled ? "bg-opacity-80 backdrop-blur-2xl" : "bg-opacity-20 backdrop-blur-md"
                )}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group ai-pulse">
                        <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-xl overflow-hidden shadow-lg shadow-brand-gold/20 group-hover:rotate-12 transition-transform">
                            <Image
                                src="/logo.jpg"
                                alt="Tradiq Zium Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="font-black text-lg md:text-xl tracking-tighter uppercase whitespace-nowrap">Tradiq Zium</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-brand-gold relative group/link",
                                    pathname === link.href ? "text-brand-gold" : "text-primary/40"
                                )}
                            >
                                {link.name}
                                <span className={cn(
                                    "absolute -bottom-1 left-0 w-0 h-[2px] brand-gradient transition-all group-hover/link:w-full",
                                    pathname === link.href && "w-full"
                                )} />
                            </Link>
                        ))}

                        <div className="flex items-center space-x-6 pl-6 border-l border-white/10">
                            <ThemeToggle />

                            {session ? (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/dashboard"
                                        className="px-6 py-2.5 rounded-full brand-gradient text-black text-[10px] font-black uppercase tracking-widest gold-glow transition-transform hover:scale-105 active:scale-95"
                                    >
                                        Console
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="p-2.5 rounded-full border border-white/10 text-primary/40 hover:text-brand-gold hover:border-brand-gold/30 transition-all"
                                        title="Disconnect"
                                    >
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="px-6 py-2.5 rounded-full border border-brand-gold/30 text-brand-gold text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-black transition-all shadow-lg hover:shadow-brand-gold/20"
                                >
                                    Access
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Right Controls */}
                    <div className="flex md:hidden items-center space-x-3">
                        <ThemeToggle className="p-2 h-10 w-10" />
                        <button
                            className={cn(
                                "p-2 rounded-xl border border-white/5 text-primary transition-all active:scale-90",
                                isOpen ? "bg-brand-gold text-black border-transparent" : "glass"
                            )}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="absolute top-28 left-6 right-6 md:hidden glass rounded-[2.5rem] p-10 flex flex-col space-y-8 border-white/5 shadow-2xl z-50 backdrop-blur-3xl bg-opacity-95 dark:bg-opacity-90"
                    >
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-brand-gold tracking-[0.5em] uppercase mb-6 opacity-50">Navigation Mesh</p>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-3xl font-black tracking-tighter block py-2 transition-all",
                                        pathname === link.href ? "text-brand-gold translate-x-2" : "text-primary/40 hover:text-primary hover:translate-x-2"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-white/5 space-y-4">
                            {session ? (
                                <div className="space-y-4">
                                    <Link
                                        href="/dashboard"
                                        className="w-full block py-5 rounded-2xl brand-gradient text-black font-black text-center uppercase tracking-[0.2em] text-xs gold-glow"
                                    >
                                        Enter Console
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full py-5 rounded-2xl border border-white/10 text-primary/40 font-black text-center uppercase tracking-[0.2em] text-xs hover:text-brand-gold hover:border-brand-gold/30 transition-all"
                                    >
                                        Disconnect Node
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="w-full block py-5 rounded-2xl brand-gradient text-black font-black text-center uppercase tracking-[0.2em] text-xs gold-glow"
                                >
                                    Request Access
                                </Link>
                            )}
                        </div>

                        <div className="pt-6 flex justify-between items-center text-primary/20">
                            <p className="text-[8px] font-black tracking-widest uppercase">TZT // NEURAL INTERFACE</p>
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
