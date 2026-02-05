[file name]: page.tsx (Login)
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight, ShoppingBag, Sparkles, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const success = await login({ email, password });
            if (success) {
                router.push("/");
            } else {
                setError("Email ou mot de passe incorrect");
            }
        } catch (err) {
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Column - Brand/Visual */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hidden lg:block"
                >
                    <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-12 h-[600px] overflow-hidden">
                        <div className="absolute inset-0 bg-black/5"></div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                        <ShoppingBag className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">ModernShop</h1>
                                        <p className="text-white/80 text-sm">Premium E-commerce</p>
                                    </div>
                                </div>
                                
                                <h2 className="text-4xl font-bold text-white mb-4">
                                    Reconnectez-vous à votre<br />univers de shopping
                                </h2>
                                <p className="text-white/80 text-lg">
                                    Accédez à vos commandes, votre wishlist et bénéficiez d'offres exclusives.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-white/90">Livraison gratuite dès 50€</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-white/90">Retours gratuits sous 30 jours</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-white/90">Support client 24/7</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"></div>
                    </div>
                </motion.div>

                {/* Right Column - Login Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center"
                >
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="flex justify-center mb-8 lg:hidden">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                    <ShoppingBag className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">ModernShop</h1>
                                    <p className="text-gray-500 text-sm">Premium E-commerce</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
                            <div className="text-center space-y-2 mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl mb-4">
                                    <Lock className="w-7 h-7 text-purple-600" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Content de vous revoir !
                                </h1>
                                <p className="text-gray-500">
                                    Connectez-vous pour continuer votre shopping
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3"
                                    >
                                        <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Lock className="w-3 h-3 text-red-600" />
                                        </div>
                                        <span>{error}</span>
                                    </motion.div>
                                )}

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                                            Adresse email
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium hover:border-gray-300"
                                                    placeholder="nom@exemple.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                                                Mot de passe
                                            </label>
                                            <Link
                                                href="/forgot-password"
                                                className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                                            >
                                                Mot de passe oublié ?
                                            </Link>
                                        </div>
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium hover:border-gray-300"
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <span>Se connecter</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="bg-white px-4 text-sm text-gray-500">
                                            Ou continuer avec
                                        </span>
                                    </div>
                                </div>

                                {/* Social Login */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                        <span className="text-sm font-medium">Facebook</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                        </svg>
                                        <span className="text-sm font-medium">Google</span>
                                    </button>
                                </div>

                                <div className="text-center pt-4 border-t border-gray-200">
                                    <p className="text-gray-500 text-sm">
                                        Vous n'avez pas de compte ?{" "}
                                        <Link
                                            href="/register"
                                            className="font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-all"
                                        >
                                            Créer un compte gratuit
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}