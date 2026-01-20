"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Cpu, Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (res?.error) {
                setError("Invalid neural credentials. Please verify your access.");
                setLoading(false);
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError("An unexpected transmission error occurred.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden bg-background">
            {/* Decorative Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-gold/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full animate-pulse delay-1000" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                    {/* Top Polish Gradient */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />

                    {/* Logo Section */}
                    <div className="flex flex-col items-center mb-10">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-16 h-16 rounded-2xl brand-gradient flex items-center justify-center text-black mb-4 shadow-xl shadow-brand-gold/30 ai-pulse"
                        >
                            <Cpu size={32} />
                        </motion.div>
                        <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Neural Login</h1>
                        <p className="text-muted-foreground text-sm text-center">Secure access to the TZT intelligence mesh</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Transmission Email</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand-gold transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="name@nexus.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-gold/50 focus:ring-4 focus:ring-brand-gold/5 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Access PIN</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand-gold transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-gold/50 focus:ring-4 focus:ring-brand-gold/5 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={cn(
                                "w-full brand-gradient py-4 rounded-2xl font-black uppercase tracking-widest text-black flex items-center justify-center space-x-2 shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/40 transition-all duration-300",
                                loading && "opacity-80"
                            )}
                        >
                            {loading ? (
                                <Loader2 size={24} className="animate-spin" />
                            ) : (
                                <>
                                    <span>Initialize Access</span>
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-white/10 pt-6">
                        <p className="text-muted-foreground text-xs uppercase tracking-widest">
                            Restricted Area. <Link href="/" className="text-brand-gold hover:underline font-black outline-none">Return to Nexus</Link>
                        </p>
                    </div>
                </div>

                {/* Footer Detail */}
                <p className="text-center mt-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">
                    TZT Neural Mesh v.2.0.0-neural | Secure Credentials Handshake Required
                </p>
            </motion.div>
        </div>
    );
}
