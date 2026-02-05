"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader2, ArrowRight, Sparkles, Eye, EyeOff, Check } from "lucide-react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const success = await register({ name, email, password });
            if (success) {
                router.push("/");
            } else {
                setError("L'inscription a échoué. Veuillez réessayer.");
            }
        } catch (err) {
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    const passwordStrength = () => {
        if (password.length === 0) return 0;
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        return strength;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50 px-4 py-20 relative overflow-hidden">
            {/* Arrière-plan décoratif */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="w-full max-w-md z-10"
            >
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-8 border border-white/30">
                    {/* En-tête */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-2">
                            <Sparkles className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Rejoignez-nous
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Créez votre compte en moins d'une minute
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 text-sm text-red-600 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-100 shadow-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    {error}
                                </div>
                            </motion.div>
                        )}

                        <div className="space-y-6">
                            {/* Champ Nom */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="space-y-2"
                            >
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Nom complet
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium shadow-sm hover:shadow-md group-hover:border-purple-300"
                                        placeholder="Votre nom complet"
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                                        <User className="w-5 h-5" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Champ Email */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-2"
                            >
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Adresse email
                                </label>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium shadow-sm hover:shadow-md group-hover:border-purple-300"
                                        placeholder="votre@email.com"
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Champ Mot de passe */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-4"
                            >
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    Mot de passe
                                </label>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-3.5 bg-white/50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium shadow-sm hover:shadow-md group-hover:border-purple-300"
                                        placeholder="Créez un mot de passe sécurisé"
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                {/* Indicateur de force du mot de passe */}
                                {password && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-medium text-gray-600">Force du mot de passe</span>
                                            <span className="font-semibold text-purple-600">{passwordStrength()}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${passwordStrength()}%` }}
                                                className={`h-full rounded-full transition-all ${
                                                    passwordStrength() < 50
                                                        ? "bg-red-400"
                                                        : passwordStrength() < 75
                                                        ? "bg-yellow-400"
                                                        : "bg-green-500"
                                                }`}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Check className={`w-3 h-3 ${password.length >= 8 ? "text-green-500" : "text-gray-300"}`} />
                                                <span>8 caractères min.</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Check className={`w-3 h-3 ${/[A-Z]/.test(password) ? "text-green-500" : "text-gray-300"}`} />
                                                <span>Majuscule</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Check className={`w-3 h-3 ${/[0-9]/.test(password) ? "text-green-500" : "text-gray-300"}`} />
                                                <span>Chiffre</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Check className={`w-3 h-3 ${/[^A-Za-z0-9]/.test(password) ? "text-green-500" : "text-gray-300"}`} />
                                                <span>Caractère spécial</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>

                        {/* Bouton d'inscription */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Création en cours...
                                </>
                            ) : (
                                <>
                                    Créer mon compte
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Lien vers connexion */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center text-gray-600"
                    >
                        <p className="text-sm">
                            Vous avez déjà un compte ?{" "}
                            <Link
                                href="/login"
                                className="font-bold text-purple-600 hover:text-purple-700 hover:underline inline-flex items-center gap-1 group"
                            >
                                Se connecter
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Animation CSS */}
            <style jsx global>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}