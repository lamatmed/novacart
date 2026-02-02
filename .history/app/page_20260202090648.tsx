/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/components/providers/CartProvider";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Sparkles, Star, ChevronRight, Heart, Eye, TrendingUp } from "lucide-react";

export default function Home() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const scaleUp = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5, ease: "backOut" }
  };

  const categories = [
    {
      name: "Électronique",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800",
      color: "from-blue-500/20 to-cyan-500/20",
      icon: "📱",
      products: "1200+ Produits"
    },
    {
      name: "Mode",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w-800",
      color: "from-rose-500/20 to-pink-500/20",
      icon: "👗",
      products: "850+ Produits"
    },
    {
      name: "Maison & Déco",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800",
      color: "from-amber-500/20 to-orange-500/20",
      icon: "🏠",
      products: "950+ Produits"
    },
    {
      name: "Sports",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800",
      color: "from-emerald-500/20 to-green-500/20",
      icon: "⚽",
      products: "700+ Produits"
    },
  ];

  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const featuredProducts = products.length > 0 ? products.slice(0, 3).map(p => ({
    id: p._id,
    name: p.name,
    price: `${p.price}€`,
    originalPrice: null,
    rating: 5,
    image: p.images?.[0] || p.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
    badge: p.stock <= 0 ? "Épuisé" : "Nouveau",
    fullProduct: p
  })) : [];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50/30">
      {/* Hero Section - Redesigned */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
        {/* Animated Gradient Background */}
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1920"
            alt="Shopping"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <motion.div
          className="relative z-10 text-center px-4 max-w-6xl mx-auto"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 group hover:bg-white/20 transition-all"
          >
            <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse" />
            <span className="text-white font-medium tracking-wide">Nouvelle Collection Automne 2026</span>
            <ChevronRight className="w-4 h-4 text-white/60 group-hover:translate-x-1 transition-transform" />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-white drop-shadow-2xl">Élévation du</span>
            <br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 animate-gradient-x">
                Style Quotidien
              </span>
              <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Découvrez une collection exclusive où l'innovation rencontre l'élégance. Des produits soigneusement sélectionnés pour transformer votre quotidien.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/shop"
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <ShoppingBag className="w-6 h-6" />
              Explorer la Boutique
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>

            <Link
              href="/collections"
              className="group px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              Voir les Collections
              <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute bottom-10 left-10 hidden lg:block"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-white/10 p-4">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "50K+", label: "Clients Satisfaits", icon: "😊" },
              { value: "10K+", label: "Produits Premium", icon: "⭐" },
              { value: "24/7", label: "Support Client", icon: "🕒" },
              { value: "150+", label: "Marques Exclusives", icon: "🏷️" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl hover:bg-gray-50/50 transition-colors group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform inline-block">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 text-purple-600 font-medium mb-3"
              >
                <div className="w-2 h-2 bg-purple-600 rounded-full" />
                CATÉGORIES PRÉFÉRÉES
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                Explorez Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Collections</span> Exclusives
              </h2>
              <p className="text-lg text-gray-600">
                Parcourez nos catégories soigneusement sélectionnées pour trouver l'inspiration parfaite.
              </p>
            </div>
            <Link
              href="/categories"
              className="group flex items-center gap-2 font-bold text-gray-900 hover:text-purple-600 transition-colors px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              Toutes les catégories
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link href={`/category/${category.name.toLowerCase()}`}>
                  <div className="absolute inset-0 bg-gradient-to-br via-white/0 to-white/0 z-10" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} transition-opacity duration-500 ${hoveredCategory === index ? 'opacity-100' : 'opacity-60'
                    }`} />

                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-all duration-700"
                    style={{
                      transform: hoveredCategory === index ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  <div className="absolute top-6 left-6 z-20">
                    <div className="text-4xl">{category.icon}</div>
                  </div>

                  <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                      <p className="text-white/80">{category.products}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-white to-white/80 rounded-full transition-all duration-500"
                            style={{ width: hoveredCategory === index ? '100%' : '70%' }}
                          />
                        </div>
                        <ArrowRight className="w-5 h-5 text-white transform group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-pink-600 font-medium mb-3"
            >
              <Sparkles className="w-5 h-5" />
              PRODUITS EN VEDETTE
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Découvrez Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">Best-Sellers</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des produits exceptionnels choisis par notre communauté
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 border border-gray-100 hover:border-purple-100">
                  {/* Product Image Container */}
                  <div className="relative h-64 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-full">
                        {product.badge}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                      </button>
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                        <Eye className="w-5 h-5 text-gray-600 hover:text-purple-600" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-gray-200 text-gray-200'
                              }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">{product.rating}</span>
                      </div>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                      <button
                        onClick={() => product.fullProduct && addToCart(product.fullProduct)}
                        className="px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full font-medium hover:shadow-lg hover:shadow-gray-900/30 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer active:scale-95"
                      >
                        Ajouter
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Banner - Enhanced */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Livraison Éclair",
                description: "Livraison gratuite et express sous 24h pour toute commande",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: ShieldCheck,
                title: "100% Sécurisé",
                description: "Paiements cryptés et protection des données garantie",
                color: "from-emerald-500 to-green-500"
              },
              {
                icon: Sparkles,
                title: "Premium Garanti",
                description: "Produits certifiés qualité avec garantie 2 ans",
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 transition-all duration-500 border border-gray-700 hover:border-gray-600"
              >
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA - Enhanced */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border border-purple-100"
          >
            {/* Animated Background */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full blur-[120px] opacity-60 animate-pulse" />
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-200 rounded-full blur-[120px] opacity-60 animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 p-12 md:p-16 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm mb-8">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-purple-600">EXCLUSIVITÉ</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Rejoignez la <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Communauté</span> NovaCart
              </h2>

              <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                Abonnez-vous à notre newsletter pour recevoir en avant-première nos nouveautés, offres exclusives et 15% de réduction sur votre première commande.
              </p>

              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="w-full px-6 py-4 rounded-full bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-500 shadow-lg focus:shadow-purple-200 transition-all"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-pink-500/0 blur-lg group-hover:opacity-100 opacity-0 transition-opacity" />
                </div>
                <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 shadow-lg">
                  S&apos;inscrire Gratuitement
                </button>
              </form>

              <p className="text-sm text-gray-500 mt-6">
                En vous inscrivant, vous acceptez notre politique de confidentialité.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}