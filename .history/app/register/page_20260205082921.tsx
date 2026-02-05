(Register)
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader2, ArrowRight, ShoppingBag, Sparkles, Eye, EyeOff, Check } from "lucide-react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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

    const passwordStrength = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    const strengthScore = Object.values(passwordStrength).filter(Boolean).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Column - Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center lg:justify-end"
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
                                    <User className="w-7 h-7 text-purple-600" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Rejoignez-nous !
                                </h1>
                                <p className="text-gray-500">
                                    Créez votre compte et profitez d'une expérience shopping unique
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
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
                                            Nom complet
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    id="name"
                                                    type="text"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium hover:border-gray-300"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>
                                    </div>

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
                                        <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                                            Mot de passe
                                        </label>
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
                                                    placeholder="Créez un mot de passe sécurisé"
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
                                        
                                        {/* Password Strength Indicator */}
                                        {password.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="space-y-2 pt-3"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-medium text-gray-600">Sécurité du mot de passe</span>
                                                    <span className={`text-xs font-bold ${
                                                        strengthScore >= 4 ? 'text-emerald-600' :
                                                        strengthScore >= 2 ? 'text-amber-600' : 'text-red-600'
                                                    }`}>
                                                        {strengthScore >= 4 ? 'Fort' : strengthScore >= 2 ? 'Moyen' : 'Faible'}
                                                    </span>
                                                </div>
                                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full transition-all duration-300 ${
                                                            strengthScore >= 4 ? 'w-full bg-emerald-500' :
                                                            strengthScore >= 2 ? 'w-2/3 bg-amber-500' : 'w-1/3 bg-red-500'
                                                        }`}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 pt-2">
                                                    {[
                                                        { label: '8+ caractères', valid: passwordStrength.length },
                                                        { label: 'Majuscule', valid: passwordStrength.uppercase },
                                                        { label: 'Minuscule', valid: passwordStrength.lowercase },
                                                        { label: 'Chiffre', valid: passwordStrength.number },
                                                        { label: 'Caractère spécial', valid: passwordStrength.special },
                                                    ].map((req, index) => (
                                                        <div key={index} className="flex items-center gap-1.5">
                                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                                                req.valid ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                                                            }`}>
                                                                <Check className="w-3 h-3" />
                                                            </div>
                                                            <span className={`text-xs ${req.valid ? 'text-emerald-700' : 'text-gray-500'}`}>
                                                                {req.label}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            required
                                            className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                        />
                                        <label htmlFor="terms" className="text-sm text-gray-600">
                                            J'accepte les{' '}
                                            <Link href="/terms" className="text-purple-600 hover:text-purple-700 font-medium">
                                                conditions d'utilisation
                                            </Link>
                                            {' '}et la{' '}
                                            <Link href="/privacy" className="text-purple-600 hover:text-purple-700 font-medium">
                                                politique de confidentialité
                                            </Link>
                                        </label>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="newsletter"
                                            className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                        />
                                        <label htmlFor="newsletter" className="text-sm text-gray-600">
                                            Je souhaite recevoir les offres exclusives et les nouveautés par email
                                        </label>
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
                                            <span>Créer mon compte</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>

                                <div className="text-center pt-4 border-t border-gray-200">
                                    <p className="text-gray-500 text-sm">
                                        Vous avez déjà un compte ?{" "}
                                        <Link
                                            href="/login"
                                            className="font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-all"
                                        >
                                            Se connecter
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column - Benefits */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
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
                                    Rejoignez notre communauté<br />de shopping premium
                                </h2>
                                <p className="text-white/80 text-lg">
                                    Profitez d'avantages exclusifs en créant votre compte gratuitement.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">Bienvenue offerte</h3>
                                        <p className="text-white/80">-10% sur votre première commande</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">Suivi personnalisé</h3>
                                        <p className="text-white/80">Recommandations basées sur vos préférences</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">Avantages membres</h3>
                                        <p className="text-white/80">Accès aux ventes privées et offres exclusives</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"></div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}