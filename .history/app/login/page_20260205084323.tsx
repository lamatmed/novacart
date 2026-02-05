"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const ok = await login({ email, password });
      ok ? router.push("/") : setError("Identifiants incorrects");
    } catch {
      setError("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950 px-4">
      
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute top-[-30%] left-[-30%] w-[600px] h-[600px] bg-purple-600/30 blur-3xl rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 22, repeat: Infinity }}
          className="absolute bottom-[-30%] right-[-30%] w-[600px] h-[600px] bg-pink-600/30 blur-3xl rounded-full"
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl space-y-8">

          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Bon retour</h1>
            <p className="text-white/60">Connectez-vous à votre espace</p>
          </div>

          {error && (
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: [0, -5, 5, 0], opacity: 1 }}
              className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <Input icon={<Mail />} value={email} onChange={setEmail} placeholder="Email" />
            <Input icon={<Lock />} value={password} onChange={setPassword} placeholder="Mot de passe" type="password" />

            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold flex justify-center gap-2 hover:scale-[1.03] transition">
              {loading ? <Loader2 className="animate-spin" /> : <>Connexion <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-white/60 text-sm">
            Pas de compte ?{" "}
            <Link href="/register" className="text-white font-semibold hover:underline">
              S’inscrire
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function Input({ icon, value, onChange, placeholder, type = "text" }: any) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
        {icon}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:ring-4 focus:ring-purple-500/30 outline-none transition"
      />
    </div>
  );
}
