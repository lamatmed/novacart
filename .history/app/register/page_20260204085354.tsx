"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader2, ArrowRight, CheckCircle } from "lucide-react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
            >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 space-y-10 border border-gray-100">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
                            Rejoignez-nous
                        </h1>
                        <p className="text-gray-600 text-lg font-medium">
                            Créez votre compte pour une expérience shopping exceptionnelle
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="p-4 text-sm font-medium text-red-600 bg-red-50/80 rounded-xl border border-red-100 backdrop-blur-sm shadow-sm"
                            >
                                ⚠️ {error}
                            </motion.div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Name Field */}
                            <div className="space-y-3">
                                <label
                                    htmlFor="name"
                                    className="text-base font-semibold text-gray-800 block pl-1"
                                >
                                    Nom complet
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-teal-500" />
                                        <input
                                            id="name"
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                                            placeholder="Votre nom complet"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-3">
                                <label
                                    htmlFor="email"
                                    className="text-base font-semibold text-gray-800 block pl-1"
                                >
                                    Email professionnel
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-teal-500" />
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                                            placeholder="votre@email.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-3 md:col-span-2">
                                <label
                                    htmlFor="password"
                                    className="text-base font-semibold text-gray-800 block pl-1"
                                >
                                    Mot de passe sécurisé
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-teal-500" />
                                        <input
                                            id="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                                            placeholder="Minimum 8 caractères"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-teal-500" />
                                        <span className="text-sm text-gray-600 font-medium">8 caractères minimum</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-teal-500" />
                                        <span className="text-sm text-gray-600 font-medium">1 majuscule</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-teal-500" />
                                        <span className="text-sm text-gray-600 font-medium">1 chiffre</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-teal-500" />
                                        <span className="text-sm text-gray-600 font-medium">1 caractère spécial</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="mt-1 w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-3 focus:ring-blue-500/30"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-700 font-medium">
                                J'accepte les{" "}
                                <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                                    conditions d'utilisation
                                </Link>{" "}
                                et la{" "}
                                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                                    politique de confidentialité
                                </Link>
                                . Je comprends que mes données seront utilisées pour améliorer mon expérience shopping.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full group relative overflow-hidden bg-gradient-to-r from-teal-500 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin relative z-10" />
                                    <span className="relative z-10">Création en cours...</span>
                                </>
                            ) : (
                                <>
                                    <span className="relative z-10">Créer mon compte gratuit</span>
                                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm uppercase">
                            <span className="bg-white px-4 text-gray-500 font-semibold">
                                Inscription rapide
                            </span>
                        </div>
                    </div>

                    {/* Social Register */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3 group">
                            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                            </svg>
                            <span className="font-bold text-gray-700 group-hover:text-blue-700">Facebook</span>
                        </button>
                        <button className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 group">
                            <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span className="font-bold text-gray-700 group-hover:text-gray-900">Google</span>
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="text-center pt-4">
                        <p className="text-gray-600 text-base font-medium">
                            Vous avez déjà un compte ?{" "}
                            <Link
                                href="/login"
                                className="font-bold text-teal-600 hover:text-teal-700 hover:underline transition-all"
                            >
                                Connectez-vous ici
                            </Link>
                        </p>
                        <p className="text-sm text-gray-500 mt-2 font-medium">
                            Déjà plus de 50 000 membres nous font confiance
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}