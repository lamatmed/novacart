"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Menu, X } from "lucide-react";
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut, ArrowLeft } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated || user?.role !== "admin") {
                router.push("/");
            }
        }
    }, [user, loading, isAuthenticated, router]);

    if (loading || !user || user.role !== "admin") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Produits', href: '/admin/products', icon: Package },
        { name: 'Commandes', href: '/admin/orders', icon: ShoppingBag },
    ];

    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                        A
                    </div>
                    <span className="font-bold text-xl text-gray-900">Admin</span>
                </div>
                <button onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} className="p-2 text-gray-600">
                    {isMobileSidebarOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen
                ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                        A
                    </div>
                    <span className="font-bold text-xl text-gray-900">Admin Panel</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium
                                ${pathname === item.href
                                    ? 'bg-purple-50 text-purple-600'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'}
                            `}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 px-4 py-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Retour au site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gray-50">
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
