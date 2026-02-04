/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { useCart } from "@/components/providers/CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, User as UserIcon, Search, LogOut, Package, Bell, ChevronDown, Sparkles, Gift, Tag, Home, Grid } from "lucide-react";
import clsx from "clsx";

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const { setIsCartOpen, cartCount } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const pathname = usePathname();

    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isMobileNotificationsOpen, setIsMobileNotificationsOpen] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) return;
        const fetchNotifications = async () => {
            try {
                const res = await fetch("/api/notifications");
                const data = await res.json();
                if (data.notifications) {
                    setNotifications(data.notifications);
                    setUnreadCount(data.unreadCount);
                }
            } catch (error) {
                console.error("Error fetching notifications", error);
            }
        };
        fetchNotifications();
        // Poll every 60s
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, [isAuthenticated]);

    const markAllRead = async () => {
        try {
            await fetch("/api/notifications", {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ markAll: true }),
            });
            setUnreadCount(0);
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (error) {
            console.error("Error marking read", error);
        }
    };

    // Scroll detection for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Accueil", href: "/", icon: Home },
        { name: "Boutique", href: "/shop", icon: Grid },
        { name: "Catégories", href: "/categories", icon: ChevronDown },
        { name: "Offres", href: "/deals", icon: Tag },
    ];

    const categories = [
        { name: "Électronique", href: "/categories/electronics", color: "from-blue-500 to-cyan-400" },
        { name: "Mode", href: "/categories/fashion", color: "from-pink-500 to-rose-400" },
        { name: "Maison", href: "/categories/home", color: "from-emerald-500 to-teal-400" },
        { name: "Sports", href: "/categories/sports", color: "from-orange-500 to-amber-400" },
        { name: "Beauté", href: "/categories/beauty", color: "from-purple-500 to-fuchsia-400" },
    ];

    return (
        <>
            {/* Top Announcement Bar */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm py-2 px-4 text-center">
                <div className="container mx-auto flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-medium">Livraison gratuite</span>
                    <Gift className="w-4 h-4 ml-2" />
                    <span className="hidden sm:inline"> | </span>
                    <span className="hidden sm:inline">30 jours satisfait ou remboursé</span>
                </div>
            </div>

            <header
                className={clsx(
                    "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg py-3"
                        : "bg-white border-b border-gray-100 py-4"
                )}
            >
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group relative">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white rounded-2xl flex items-center justify-center font-bold text-2xl group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/20">
                                N
                            </div>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                                <Sparkles className="w-3 h-3 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-3xl tracking-tight bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                                NovaCart
                            </span>
                            <span className="text-xs text-gray-500 font-medium">Modern Shopping</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <div key={link.name} className="relative">
                                    {link.name === "Catégories" ? (
                                        <button
                                            onMouseEnter={() => setIsCategoriesOpen(true)}
                                            onMouseLeave={() => setIsCategoriesOpen(false)}
                                            className={clsx(
                                                "px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 group",
                                                pathname.startsWith("/categories")
                                                    ? "text-white bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg shadow-purple-500/30"
                                                    : "text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
                                            )}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {link.name}
                                            <ChevronDown className={clsx(
                                                "w-4 h-4 transition-transform duration-300",
                                                isCategoriesOpen && "rotate-180"
                                            )} />
                                        </button>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className={clsx(
                                                "px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 group",
                                                pathname === link.href
                                                    ? "text-white bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg shadow-purple-500/30"
                                                    : "text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
                                            )}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Categories Dropdown */}
                    <AnimatePresence>
                        {isCategoriesOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                onMouseEnter={() => setIsCategoriesOpen(true)}
                                onMouseLeave={() => setIsCategoriesOpen(false)}
                                className="absolute top-full left-0 right-0 lg:left-auto lg:right-auto lg:w-[600px] mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50 hidden lg:block"
                            >
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.name}
                                            href={category.href}
                                            className="group p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300"
                                            onClick={() => setIsCategoriesOpen(false)}
                                        >
                                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                                <Grid className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">Découvrir les produits</p>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Search */}
                        <div className="hidden md:flex items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl px-4 py-3 group focus-within:bg-white focus-within:ring-2 focus-within:ring-purple-500 focus-within:shadow-lg">
                            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500" />
                            <input
                                type="text"
                                placeholder="Rechercher des produits..."
                                className="ml-3 bg-transparent outline-none text-sm w-48 placeholder-gray-400 text-gray-800"
                            />
                            <kbd className="hidden lg:inline-flex ml-2 px-2 py-1 text-xs font-semibold text-gray-500 bg-white border border-gray-200 rounded">
                                ⌘K
                            </kbd>
                        </div>

                        {/* Notifications */}
                        {isAuthenticated && (
                            <div className="relative">
                                <button
                                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                    className="p-3 text-gray-600 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-300 relative"
                                >
                                    <Bell className="w-5 h-5" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                    )}
                                </button>

                                <AnimatePresence>
                                    {isNotificationsOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 origin-top-right"
                                        >
                                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                                <h3 className="font-bold text-gray-900">Notifications</h3>
                                                {unreadCount > 0 && (
                                                    <button onClick={markAllRead} className="text-xs text-purple-600 hover:underline font-medium">
                                                        Tout marquer comme lu
                                                    </button>
                                                )}
                                            </div>
                                            <div className="max-h-80 overflow-y-auto">
                                                {notifications.length === 0 ? (
                                                    <div className="p-8 text-center text-gray-500 text-sm">
                                                        Aucune notification.
                                                    </div>
                                                ) : (
                                                    notifications.map((notif: any) => (
                                                        <div key={notif._id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-purple-50/30' : ''}`}>
                                                            <div className="flex gap-3">
                                                                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!notif.read ? 'bg-purple-500' : 'bg-gray-300'}`} />
                                                                <div className="flex-1">
                                                                    <p className="text-sm text-gray-800 leading-snug mb-1">{notif.message}</p>
                                                                    <span className="text-xs text-gray-400">{new Date(notif.createdAt).toLocaleDateString()}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Cart */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="p-3 text-gray-700 hover:text-white hover:bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl transition-all duration-300 relative group"
                        >
                            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <AnimatePresence>
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-black flex items-center justify-center rounded-full border-2 border-white shadow-lg"
                                    >
                                        {cartCount > 99 ? "99+" : cartCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>

                        {/* User Auth */}
                        {isAuthenticated ? (
                            <div className="hidden md:flex items-center gap-3 ml-2">
                                <div className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold">
                                        {user?.name?.[0] || "U"}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-900 leading-none">
                                            {user?.name || "Utilisateur"}
                                        </span>
                                        <span className="text-xs text-purple-600 font-semibold leading-none">
                                            {user?.role === "admin" ? "Admin Premium" : "Membre"}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <Link
                                        href="/orders"
                                        className="p-3 text-gray-600 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-300"
                                        title="Mes Commandes"
                                    >
                                        <Package className="w-5 h-5" />
                                    </Link>

                                    {user?.role === "admin" && (
                                        <Link
                                            href="/admin"
                                            className={clsx(
                                                "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                                                pathname === "/admin"
                                                    ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg"
                                                    : "text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50"
                                            )}
                                        >
                                            Admin
                                        </Link>
                                    )}

                                    <button
                                        onClick={logout}
                                        className="p-3 text-gray-600 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-xl transition-all duration-300"
                                        title="Déconnexion"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-3 ml-4">
                                <Link
                                    href="/login"
                                    className="px-5 py-3 text-sm font-bold text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-300"
                                >
                                    Connexion
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                >
                                    <UserIcon className="w-4 h-4" />
                                    Inscription
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-3 text-gray-600 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-300"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 300 }}
                        className="fixed inset-0 top-0 z-50 bg-gradient-to-b from-white to-gray-50 md:hidden overflow-y-auto"
                    >
                        <div className="p-6 pt-20">
                            {/* Mobile Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center">
                                        <span className="text-white text-2xl font-bold">N</span>
                                    </div>
                                    <div>
                                        <h2 className="font-black text-2xl text-gray-900">NovaCart</h2>
                                        <p className="text-sm text-gray-500">Menu</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-3 rounded-xl bg-gradient-to-r from-gray-300 to-gray-800"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Mobile Search */}
                            <div className="mb-8">
                                <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl px-4 py-4">
                                    <Search className="w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher..."
                                        className="ml-3 bg-transparent outline-none flex-1 placeholder-gray-400 text-gray-700"
                                    />
                                </div>
                            </div>

                            {/* Mobile Navigation */}
                            <nav className="flex flex-col gap-2 mb-8">
                                {navLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={clsx(
                                                "flex items-center gap-4 p-4 rounded-xl text-lg font-bold transition-all",
                                                pathname === link.href
                                                    ? "text-white bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg"
                                                    : "text-gray-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
                                            )}
                                        >
                                            <div className={clsx(
                                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                                pathname === link.href
                                                    ? "bg-white/20"
                                                    : "bg-gradient-to-r from-purple-100 to-pink-100"
                                            )}>
                                                <Icon className={clsx(
                                                    "w-6 h-6",
                                                    pathname === link.href ? "text-white" : "text-purple-600"
                                                )} />
                                            </div>
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* User Section */}
                            <div className="border-t border-gray-100 pt-8">
                                {isAuthenticated ? (
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                                                {user?.name?.[0] || "U"}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-lg text-gray-900">{user?.name}</p>
                                                <p className="text-sm text-purple-600 font-semibold">{user?.role || "Membre"}</p>
                                                <p className="text-sm text-gray-500">{user?.email}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <Link
                                                href="/orders"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 flex flex-col items-center justify-center"
                                            >
                                                <Package className="w-6 h-6 text-blue-600 mb-2" />
                                                <span className="font-semibold text-blue-600">Commandes</span>
                                            </Link>

                                            {user?.role === "admin" && (
                                                <Link
                                                    href="/admin"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 flex flex-col items-center justify-center"
                                                >
                                                    <span className="text-2xl mb-2">⚡</span>
                                                    <span className="font-semibold text-red-600">Admin</span>
                                                </Link>
                                            )}

                                            <div className={`col-span-2 transition-all duration-300`}>
                                                <button
                                                    onClick={() => setIsMobileNotificationsOpen(!isMobileNotificationsOpen)}
                                                    className="w-full p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 flex flex-col items-center justify-center relative"
                                                >
                                                    <Bell className="w-6 h-6 text-gray-600 mb-2" />
                                                    <span className="font-semibold text-gray-600">
                                                        Notifications {unreadCount > 0 && `(${unreadCount})`}
                                                    </span>
                                                    {unreadCount > 0 && (
                                                        <span className="absolute top-3 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                                    )}
                                                </button>

                                                <AnimatePresence>
                                                    {isMobileNotificationsOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="mt-2 bg-white rounded-xl border border-gray-100 overflow-hidden"
                                                        >
                                                            <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                                                <span className="text-xs font-bold text-gray-500 uppercase">Récents</span>
                                                                {unreadCount > 0 && (
                                                                    <button onClick={markAllRead} className="text-xs text-purple-600 hover:underline font-medium">
                                                                        Tout lu
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <div className="max-h-60 overflow-y-auto">
                                                                {notifications.length === 0 ? (
                                                                    <div className="p-4 text-center text-gray-500 text-sm">
                                                                        Aucune notification.
                                                                    </div>
                                                                ) : (
                                                                    notifications.map((notif: any) => (
                                                                        <div key={notif._id} className={`p-3 border-b border-gray-50 text-left ${!notif.read ? 'bg-purple-50/30' : ''}`}>
                                                                            <p className="text-sm text-gray-800 leading-snug mb-1">{notif.message}</p>
                                                                            <span className="text-xs text-gray-400">{new Date(notif.createdAt).toLocaleDateString()}</span>
                                                                        </div>
                                                                    ))
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 flex flex-col items-center justify-center"
                                            >
                                                <LogOut className="w-6 h-6 text-red-600 mb-2" />
                                                <span className="font-semibold text-red-600">Déconnexion</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="w-full py-4 text-center rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 font-bold text-gray-900 text-lg"
                                        >
                                            Connexion
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="w-full py-4 text-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg flex items-center justify-center gap-3"
                                        >
                                            <UserIcon className="w-5 h-5" />
                                            Créer un compte
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Quick Categories */}
                            <div className="mt-8">
                                <h3 className="font-bold text-gray-900 mb-4">Catégories rapides</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.name}
                                            href={category.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white font-semibold text-center`}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer to prevent content overlap */}
            <div className="h-[1px]" />
        </>
    );
}