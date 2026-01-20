"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={cn(
                "p-2.5 rounded-full glass hover:border-brand-gold/30 transition-all text-primary",
                className
            )}
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 text-brand-gold" />
            ) : (
                <Moon className="w-5 h-5 text-brand-gold" />
            )}
        </motion.button>
    );
}
