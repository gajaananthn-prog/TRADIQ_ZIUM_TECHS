"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("http://localhost:5000/api/v1/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <div className="relative">
            {status === "success" ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 glass rounded-[2rem] text-center border-brand-gold/30"
                >
                    <CheckCircle2 className="w-16 h-16 text-brand-gold mx-auto mb-6" />
                    <h3 className="text-3xl font-black mb-4">Transmission Received</h3>
                    <p className="text-primary/60">Our neural coordinators will reach out shortly.</p>
                    <button
                        onClick={() => setStatus("idle")}
                        className="mt-8 px-8 py-3 rounded-full glass-pill text-xs font-black uppercase tracking-widest hover:text-brand-gold transition-colors"
                    >
                        Send Another Message
                    </button>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className="block text-[10px] uppercase tracking-[0.3em] font-black text-brand-gold mb-3 ml-2">Identifier</label>
                            <input
                                required
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-6 py-4 rounded-2xl glass border-white/5 focus:border-brand-gold/50 outline-none transition-all focus:ring-1 focus:ring-brand-gold/20"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-[10px] uppercase tracking-[0.3em] font-black text-brand-gold mb-3 ml-2">Neural Node</label>
                            <input
                                required
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-6 py-4 rounded-2xl glass border-white/5 focus:border-brand-gold/50 outline-none transition-all focus:ring-1 focus:ring-brand-gold/20"
                            />
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-[10px] uppercase tracking-[0.3em] font-black text-brand-gold mb-3 ml-2">Query Data</label>
                        <textarea
                            required
                            rows={5}
                            placeholder="Tell us about your project..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl glass border-white/5 focus:border-brand-gold/50 outline-none transition-all focus:ring-1 focus:ring-brand-gold/20 resize-none"
                        />
                    </div>

                    <button
                        disabled={status === "loading"}
                        type="submit"
                        className="w-full py-5 rounded-2xl brand-gradient text-black font-black uppercase tracking-[0.3em] text-sm gold-glow transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3"
                    >
                        <span>{status === "loading" ? "Transmitting..." : "Send Message"}</span>
                        <Send className="w-4 h-4" />
                    </button>

                    {status === "error" && (
                        <p className="text-red-400 text-xs text-center font-bold uppercase tracking-widest">Transmission failed. Please verify connection.</p>
                    )}
                </form>
            )}
        </div>
    );
}
