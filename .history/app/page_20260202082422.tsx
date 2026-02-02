/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Sparkles, Star, TrendingUp, Zap, Clock, CheckCircle, Award, Gift, ChevronRight, Heart, Eye } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const categories = [
    { 
      name: "Électronique", 
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800", 
      color: "from-blue-500 to-cyan-400",
      items: "1200+ produits",
      icon: "💻"
    },
    { 
      name: "Mode", 
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800", 
      color: "from-pink-500 to-rose-400",
      items: "850+ articles",
      icon: "👗"
    },
    { 
      name: "Maison & Déco", 
      image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=800", 
      color: "from-emerald-500 to-teal-400",
      items: "900+ produits",
      icon: "🏠"
    },
    { 
      name: "Sports", 
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800", 
      color: "from-orange-500 to-amber-400",
      items: "700+ équipements",
      icon: "⚽"
    },
  ];

  const features = [
    {
      icon: Truck,
      title: "Livraison Express",
      description: "Livraison gratuite en 24h",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: ShieldCheck,
      title: "Paiement 100% Sécurisé",
      description: "Cryptage bancaire SSL",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: Sparkles,
      title: "Qualité Premium",
      description: "Produits certifiés",
      gradient: "from-emerald-500 to-teal-400",
    },
    {
      icon: Clock,
      title: "Support 24/7",
      description: "Assistance disponible",
      gradient: "from-orange-500 to-amber-400",
    },
  ];

  const trendingProducts = [
    {
      id: 1,
      name: "AirPods Pro 2",
      category: "Audio",
      price: "249€",
      oldPrice: "299€",
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 2,
      name: "Montre Connectée",
      category: "Wearables",
      price: "199€",
      oldPrice: "249€",
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w-600",
    },
    {
      id: 3,
      name: "Sac à Dos Urbain",
      category: "Mode",
      price: "79€",
      oldPrice: "99€",
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w-600",
    },
    {
      id: 4,
      name: "Lampe Design",
      category: "Maison",
      price: "129€",
      oldPrice: "159€",
      rating: 4.7,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w-600",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section avec effet Parallax */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20" />
          <Image
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1920"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
          
          {/* Effets de particules */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]" />
        </motion.div>

        <motion.div
          className="relative z-10 text-center px-4 max-w-6xl mx-auto"
          initial="initial"
          animate={isVisible ? "animate" : "initial"}
          variants={stagger}
          style={{ opacity }}
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-white text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4" />
              NOUVELLE COLLECTION 2026
            </span>
          </motion.div>
          
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight drop-shadow-2xl"
          >
            L'Art du Shopping <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-white">
              Réinventé
            </span>
          </motion.h1>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Découvrez une expérience shopping unique avec des produits soigneusement sélectionnés, 
            des designs exclusifs et un service d'exception.
          </motion.p>
          
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              href="/shop"
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 hover:scale-105 shadow-xl flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explorer la Boutique
                <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            
            <Link
              href="/collections"
              className="group px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-500 hover:scale-105 flex items-center gap-3"
            >
              Voir les Collections
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
          
          {/* Stats en bas du hero */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {[
              { value: "50K+", label: "Clients Satisfaits" },
              { value: "10K+", label: "Produits Premium" },
              { value: "24h", label: "Livraison Express" },
              { value: "4.9", label: "Note Moyenne" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/60 text-sm">Défiler</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section avec animations */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">NovaCart</span> ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une expérience shopping exceptionnelle avec des avantages exclusifs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 mb-4">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600">TRENDING MAINTENANT</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
                Produits Tendance du Moment
              </h2>
              <p className="text-lg text-gray-800 font-medium">
                Découvrez les articles les plus populaires cette semaine
              </p>
            </div>
            <Link 
              href="/shop" 
              className="mt-4 md:mt-0 inline-flex items-center gap-2 font-bold text-gray-900 hover:text-purple-600 group"
            >
              Voir tous les produits
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Badge de promotion */}
                {product.oldPrice && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full">
                      -{Math.round((1 - parseInt(product.price)/parseInt(product.oldPrice)) * 100)}%
                    </span>
                  </div>
                )}

                {/* Actions produit */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50">
                    <Eye className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Image produit */}
                <div className="relative h-64 mb-6 rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Contenu produit */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-900 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    {product.oldPrice && (
                      <span className="text-lg text-gray-400 line-through">{product.oldPrice}</span>
                    )}
                  </div>
                  
                  <button className="w-full py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 group-hover:from-purple-600 group-hover:to-pink-600">
                    Ajouter au panier
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section améliorée */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Explorez Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Collections</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Parcourez nos catégories soigneusement sélectionnées pour trouver exactement ce qu'il vous faut
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.05 }}
                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
              >
                <Link href={`/category/${category.name.toLowerCase()}`}>
                  {/* Fond avec dégradé */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`} />
                  
                  {/* Image de fond */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Contenu */}
                  <div className="relative h-full p-8 flex flex-col justify-end">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white/80 mb-4">{category.items}</p>
                    <div className="flex items-center gap-2 text-white/90 font-medium group-hover:text-white">
                      Explorer
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section premium */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background décoratif */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl border border-gray-100"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 mb-8">
              <Gift className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-purple-600">OFFRE EXCLUSIVE</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                10% de réduction
              </span>
              <br />
              sur votre première commande
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter et recevez nos offres exclusives en avant-première
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="w-full px-6 py-5 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-500 shadow-lg"
                />
                <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 opacity-0 transition-opacity" />
              </div>
              <button
                type="submit"
                className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 hover:scale-105 shadow-xl"
              >
                S'inscrire gratuitement
              </button>
            </form>
            
            <p className="text-sm text-gray-500 mt-6">
              En vous inscrivant, vous acceptez nos conditions d'utilisation. Désinscription à tout moment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ce que disent nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">clients</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Découvrez pourquoi des milliers de clients nous font confiance
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Marie L.",
                role: "Designer",
                comment: "La qualité des produits est exceptionnelle. Livraison ultra-rapide et service client au top !",
                rating: 5,
                avatar: "👩‍🎨"
              },
              {
                name: "Thomas R.",
                role: "Développeur",
                comment: "Une expérience shopping unique. Les produits sont soigneusement sélectionnés et l'interface est magnifique.",
                rating: 5,
                avatar: "👨‍💻"
              },
              {
                name: "Sophie D.",
                role: "Entrepreneuse",
                comment: "Je recommande NovaCart à tous mes proches. Le rapport qualité-prix est imbattable !",
                rating: 5,
                avatar: "👩‍💼"
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">{testimonial.name}</h4>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}