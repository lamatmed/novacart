"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categories = [
    { name: "Électronique", image: "/cat-electronics.png", color: "bg-blue-100" },
    { name: "Mode", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600", color: "bg-pink-100" },
    { name: "Maison & Déco", image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=600", color: "bg-yellow-100" },
    { name: "Sports", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600", color: "bg-green-100" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-light.png"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="px-4 py-1.5 rounded-full border border-gray-900/10 bg-white/40 backdrop-blur-md text-gray-900 text-sm font-medium tracking-wide">
              Nouvelle Collection 2026
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight mb-6 drop-shadow-sm"
          >
            Redéfinissez Votre Style <br /> Avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">NovaCart</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Découvrez une sélection soignée de produits premium conçus pour élever votre quotidien. La qualité rencontre l'esthétique.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/shop"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105 shadow-md flex items-center gap-2"
            >
              Commencer les Achats <ShoppingBag className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/40 backdrop-blur-md border border-white/60 text-gray-900 rounded-full font-bold text-lg hover:bg-white/60 transition-all hover:scale-105 flex items-center gap-2"
            >
              Explorer les Collections <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Banner */}
      <section className="py-12 bg-white border-b border-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start group p-4 rounded-2xl hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Livraison Gratuite</h3>
              <p className="text-sm text-gray-500">Pour tout achat de plus de 150€</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start group p-4 rounded-2xl hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Paiement Sécurisé</h3>
              <p className="text-sm text-gray-500">Paiement 100% sécurisé</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start group p-4 rounded-2xl hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Qualité Premium</h3>
              <p className="text-sm text-gray-500">Produits certifiés haut de gamme</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Acheter par Catégorie</h2>
              <p className="text-lg text-gray- font-medium">Explorez notre large gamme de collections premium</p>
            </div>
            <Link href="/categories" className="hidden md:flex items-center gap-2 font-medium hover:underline text-gray-800">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[300px] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
              >
                <Link href={`/category/${category.name.toLowerCase()}`}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl flex justify-between items-center shadow-sm">
                      <span className="font-bold text-gray-900 text-lg">{category.name}</span>
                      <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center transform -rotate-45 group-hover:rotate-0 transition-all duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden ring-1 ring-purple-100">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full blur-[100px] opacity-60 mix-blend-multiply" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-200 rounded-full blur-[100px] opacity-60 mix-blend-multiply" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Rejoignez le Club NovaCart</h2>
            <p className="text-gray-600 text-lg">Inscrivez-vous à notre newsletter pour un accès exclusif aux nouveautés et 10% de réduction sur votre première commande.</p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Entrez votre email"
                className="flex-1 px-6 py-4 rounded-full bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-sm"
              />
              <button className="px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-colors shadow-lg hover:shadow-xl">
                S'abonner
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
