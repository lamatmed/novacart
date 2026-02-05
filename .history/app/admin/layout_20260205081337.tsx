
"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Menu, X, Bell, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut, ArrowLeft, Users, BarChart3 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated || user?.role !== "admin") {
                router.push("/");
            }
        }
    }, [user, loading, isAuthenticated, router]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading || !user || user.role !== "admin") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse opacity-20"></div>
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600 absolute inset-0 m-auto" />
                </div>
            </div>
        );
    }

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Produits', href: '/admin/products', icon: Package },
        { name: 'Commandes', href: '/admin/orders', icon: ShoppingBag },
        { name: 'Utilisateurs', href: '/admin/users', icon: Users },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 bg-white/90 backdrop-blur-xl border-r border-gray-200/50 
                flex flex-col transition-all duration-500 ease-out md:static md:h-screen
                ${isMobileSidebarOpen ? 'translate-x-0 w-72 shadow-2xl' : '-translate-x-full md:translate-x-0'}
                ${isSidebarCollapsed ? 'md:w-24' : 'md:w-72'}
            `}>
                {/* Sidebar Header */}
                <div className="p-6 border-b border-gray-200/50 flex items-center justify-between h-20">
                    <div className={`flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center w-full' : ''}`}>
                        <div className="relative group">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20 cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
                                A
                            </div>
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        {!isSidebarCollapsed && (
                            <div className="flex flex-col">
                                <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Admin Panel</span>
                                <span className="text-xs text-gray-400">Dashboard v2.0</span>
                            </div>
                        )}
                    </div>
                    {!isSidebarCollapsed && (
                        <button className="hidden md:block p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setIsSidebarCollapsed(true)}>
                            <ChevronLeft className="w-5 h-5 text-gray-400" />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileSidebarOpen(false)}
                                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group
                                    ${isActive
                                        ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 shadow-sm'
                                        : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50/50'}
                                    ${isSidebarCollapsed ? 'justify-center px-3' : ''}
                                `}
                                title={isSidebarCollapsed ? item.name : ""}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full"></div>
                                )}
                                <Icon className={`w-5 h-5 min-w-[1.25rem] transition-transform group-hover:scale-110 ${isActive ? 'text-purple-500' : ''}`} />
                                {!isSidebarCollapsed && (
                                    <>
                                        <span className="flex-1">{item.name}</span>
                                        {isActive && (
                                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                                        )}
                                    </>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-gray-200/50 space-y-2">
                    <Link 
                        href="/" 
                        className={`flex items-center gap-3 text-gray-500 hover:text-gray-900 px-4 py-3 rounded-xl transition-all hover:bg-gray-50/50 group ${isSidebarCollapsed ? 'justify-center px-3' : ''}`}
                        title="Retour au site"
                    >
                        <ArrowLeft className="w-5 h-5 min-w-[1.25rem] transition-transform group-hover:-translate-x-0.5" />
                        {!isSidebarCollapsed && <span>Retour au site</span>}
                    </Link>
                    
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-white/50 ${isSidebarCollapsed ? 'justify-center px-3' : ''}`}>
                        <div className="relative">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold">
                                {user.name?.charAt(0) || 'U'}
                            </div>
                        </div>
                        {!isSidebarCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{user.name || 'Admin'}</p>
                                <p className="text-xs text-gray-900 truncate">Administrateur</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden animate-in fade-in"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className={`sticky top-0 z-20 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'}`}>
                    <div className="px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setIsMobileSidebarOpen(true)}
                                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <Menu className="w-5 h-5 text-gray-600" />
                            </button>
                            
                            {isSidebarCollapsed && (
                                <button 
                                    onClick={() => setIsSidebarCollapsed(false)}
                                    className="hidden md:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>
                            )}
                            
                            <div className="relative flex-1 max-w-xl">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="w-full pl-12 pr-4 py-2.5 bg-gray-100/50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white"
                                />
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button className="p-2 relative hover:bg-gray-100 rounded-xl transition-colors">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="w-px h-6 bg-gray-200"></div>
                            <div className="hidden md:flex flex-col text-right">
                                <span className="text-sm font-medium">{user.name || 'Admin'}</span>
                                <span className="text-xs text-gray-400">En ligne</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto">
                    <div className="p-6 md:p-8">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}