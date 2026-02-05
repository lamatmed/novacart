"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

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
    setError("");
    setIsLoading(true);

    try {
      const success = await register({ name, email, password });
      if (success) {
        router.push("/");
      } else {
        setError("L'inscription a échoué. Veuillez réessayer.");
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
              Créer un compte 🚀
            </h1>
            <p className="text-gray-500">
              Rejoignez-nous en quelques secondes
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

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
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
              <label className="text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Créez un mot de passe"
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
                  Créer le compte <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Vous avez déjà un compte ?{" "}
            <Link
              href="/login"
              className="font-semibold text-black hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
