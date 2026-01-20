"use client";

import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Settings, LogOut, Code, Zap } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    const { data: session, status } = useSession();

    // For demo purposes, we allow viewing even if not actually logged in (conditional UI)
    const user = session?.user || { name: "Guest Developer", email: "guest@tzt.ai" };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 flex flex-col p-6 glass">
                <div className="mb-12">
                    <h2 className="text-xl font-black brand-gradient text-transparent bg-clip-text tracking-tighter">TZT CORE</h2>
                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-40">Neural Node v2.0</p>
                </div>

                <nav className="flex-1 space-y-2">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
                    <NavItem icon={<Zap size={20} />} label="Neural Assets" />
                    <NavItem icon={<Code size={20} />} label="API Mesh" />
                    <NavItem icon={<Users size={20} />} label="Team" />
                    <NavItem icon={<Settings size={20} />} label="Protocol Settings" />
                </nav>

                <button
                    onClick={() => signOut()}
                    className="mt-auto flex items-center space-x-3 text-white/40 hover:text-white transition-colors p-3"
                >
                    <LogOut size={20} />
                    <span className="font-medium">De-authenticate</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">System Overview</h1>
                        <p className="text-white/40">Monitoring neural network health and deployment status.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-bold">{user.name}</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">{user.email}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full brand-gradient p-[1px]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-sm">
                                {user.name?.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard label="Active Nodes" value="1,248" trend="+12%" />
                    <StatCard label="Inference Speed" value="42ms" trend="-4ms" inverted />
                    <StatCard label="Mesh Health" value="99.9%" trend="Stable" />
                </div>

                <section className="rounded-3xl glass p-8 border border-white/5">
                    <h3 className="text-xl font-bold mb-6">Recent Deployments</h3>
                    <div className="space-y-4">
                        <DeploymentItem name="Neural Core v2.1-alpha" status="Deployed" time="2h ago" />
                        <DeploymentItem name="TZT Edge Mesh Optimization" status="Verifying" time="5h ago" />
                        <DeploymentItem name="Legacy Bridge Patch" status="Archived" time="1d ago" />
                    </div>
                </section>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <div className={`flex items-center space-x-3 p-3 rounded-xl transition-all cursor-pointer ${active ? 'bg-white/10 text-brand-primary' : 'text-white/40 hover:bg-white/5 hover:text-white'
            }`}>
            {icon}
            <span className="font-semibold">{label}</span>
        </div>
    );
}

function StatCard({ label, value, trend, inverted = false }: { label: string, value: string, trend: string, inverted?: boolean }) {
    return (
        <div className="p-6 rounded-2xl glass border border-white/5">
            <p className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2">{label}</p>
            <div className="flex justify-between items-end">
                <h4 className="text-3xl font-black">{value}</h4>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${inverted ? 'bg-brand-primary/20 text-brand-primary' : 'bg-brand-secondary/20 text-brand-secondary'
                    }`}>
                    {trend}
                </span>
            </div>
        </div>
    );
}

function DeploymentItem({ name, status, time }: { name: string, status: string, time: string }) {
    return (
        <div className="flex justify-between items-center p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
            <div className="flex items-center space-x-4">
                <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                <div>
                    <p className="font-bold">{name}</p>
                    <p className="text-xs text-white/30">{time}</p>
                </div>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-60">{status}</span>
        </div>
    );
}
