/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login({ email, password });
      if (success) {
        router.push("/");
      } else {
        setError("Email ou mot de passe incorrect");
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Bon retour 👋
            </h1>
            <p className="text-gray-500">
              Connectez-vous pour accéder à votre compte
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: [0, -5, 5, -3, 0] }}
                transition={{ duration: 0.4 }}
                className="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100"
              >
                {error}
              </motion.div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="
                    w-full pl-10 pr-4 py-3
                    border border-gray-200 rounded-xl
                    bg-white/90
                    focus:ring-4 focus:ring-purple-500/20
                    focus:border-purple-500
                    outline-none transition-all
                    text-black font-medium
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-gray-600 hover:text-black transition"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="
                    w-full pl-10 pr-4 py-3
                    border border-gray-200 rounded-xl
                    bg-white/90
                    focus:ring-4 focus:ring-purple-500/20
                    focus:border-purple-500
                    outline-none transition-all
                    text-black font-medium
                  "
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-purple-600 to-pink-600
                hover:scale-[1.02]
                hover:shadow-xl hover:shadow-purple-500/30
                transition-all duration-300
                flex items-center justify-center gap-2
                disabled:opacity-70 disabled:cursor-not-allowed
              "
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Se connecter <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-500">
                Ou
              </span>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Pas encore de compte ?{" "}
            <Link
              href="/register"
              className="font-semibold text-black hover:underline"
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
