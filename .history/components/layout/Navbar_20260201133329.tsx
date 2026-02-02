"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { useCart } from "@/components/providers/CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, User as UserIcon, Search, LogOut, Package } from "lucide-react";
import clsx from "clsx";

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const { setIsCartOpen, cartCount } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Scroll detection for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Accueil", href: "/" },
        { name: "Boutique", href: "/shop" },
        { name: "Catégories", href: "/categories" },
        { name: "Offres", href: "/deals" },
    ];

    return (
        <>
            <header
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                    isScrolled
                        ? "bg-white/80 backdrop-blur-md border-gray-200 shadow-sm py-3"
                        : "bg-transparent border-transparent py-5"
                )}
            >
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                            N
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-gray-900">
                            NovaCart
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all relative overflow-hidden group",
                                    pathname === link.href ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
                                )}
                            >
                                <span className="relative z-10">{link.name}</span>
                                {pathname === link.href ? (
                                    <motion.div
                                        layoutId="nav-bg"
                                        className="absolute inset-0 bg-gray-100"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                                )}
                            </Link>
                        ))}
                        {user?.role === "admin" && (
                            <Link
                                href="/admin"
                                className={clsx(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all relative ml-2",
                                    pathname === "/admin"
                                        ? "bg-red-50 text-red-600"
                                        : "text-red-600 hover:bg-red-50"
                                )}
                            >
                                Admin
                            </Link>
                        )}
                    </nav>


                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search Icon (Hidden on mobile usually or opens modal) */}
                        <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Cart */}
                        {/* Cart */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors relative"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <AnimatePresence>
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white"
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>

                        {/* User Auth */}
                        {isAuthenticated ? (
                            <div className="hidden md:flex items-center gap-3 ml-2">
                                <div className="flex flex-col items-end mr-1">
                                    <span className="text-xs font-semibold text-gray-900 leading-none">
                                        {user?.name || "Utilisateur"}
                                    </span>
                                    <span className="text-[10px] text-gray-500 leading-none">
                                        {user?.role || "Membre"}
                                    </span>
                                </div>
                                <Link
                                    href="/orders"
                                    className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                                    title="Mes Commandes"
                                >
                                    <Package className="w-5 h-5" />
                                </Link>
                                <button
                                    onClick={logout}
                                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-2 ml-2">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                                >
                                    Connexion
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:shadow-lg hover:shadow-purple-500/20 transition-all hover:scale-105"
                                >
                                    Inscription
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-gray-600 hover:text-black"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div >
            </header >

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {
                    isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-0 top-[70px] z-40 bg-white md:hidden overflow-y-auto"
                        >
                            <div className="p-6 flex flex-col gap-6">
                                <nav className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-2xl font-semibold text-gray-800 hover:text-black"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    {user?.role === "admin" && (
                                        <Link
                                            href="/admin"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-2xl font-semibold text-red-600 hover:text-red-700"
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}
                                </nav>

                                <div className="border-t border-gray-100 pt-6">
                                    {isAuthenticated ? (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <UserIcon className="w-5 h-5 text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{user?.name}</p>
                                                    <p className="text-sm text-gray-500">{user?.email}</p>
                                                </div>
                                            </div>
                                            <Link
                                                href="/orders"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center gap-2 text-gray-700 font-medium hover:text-black"
                                            >
                                                <Package className="w-4 h-4" /> Mes Commandes
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="flex items-center gap-2 text-red-600 font-medium"
                                            >
                                                <LogOut className="w-4 h-4" /> Déconnexion
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            <Link
                                                href="/login"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="w-full py-3 text-center rounded-xl bg-gray-100 font-semibold text-gray-900"
                                            >
                                                Connexion
                                            </Link>
                                            <Link
                                                href="/register"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="w-full py-3 text-center rounded-xl bg-black text-white font-semibold flex items-center justify-center gap-2"
                                            >
                                                Inscription
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence >

            {/* Spacer to prevent content overlap */}
            < div className="h-[80px]" />
        </>
    );
}
