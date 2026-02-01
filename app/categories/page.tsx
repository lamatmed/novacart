"use client";

import React from "react";
import Link from "next/link";
import { Laptop, Shirt, Home, Trophy, ArrowRight, Wallet } from "lucide-react";

export default function CategoriesPage() {
    const categories = [
        {
            name: "Electronics",
            displayName: "Électronique",
            description: "Derniers gadgets, téléphones et accessoires.",
            icon: Laptop,
            color: "bg-blue-100 text-blue-600",
            hoverColor: "group-hover:bg-blue-600 group-hover:text-white"
        },
        {
            name: "Fashion",
            displayName: "Mode",
            description: "Vêtements tendance pour hommes et femmes.",
            icon: Shirt,
            color: "bg-pink-100 text-pink-600",
            hoverColor: "group-hover:bg-pink-600 group-hover:text-white"
        },
        {
            name: "Home",
            displayName: "Maison",
            description: "Décoration, meubles et accessoires pour votre intérieur.",
            icon: Home,
            color: "bg-orange-100 text-orange-600",
            hoverColor: "group-hover:bg-orange-600 group-hover:text-white"
        },
        {
            name: "Sports",
            displayName: "Sport",
            description: "Équipements pour vos activités sportives.",
            icon: Trophy,
            color: "bg-green-100 text-green-600",
            hoverColor: "group-hover:bg-green-600 group-hover:text-white"
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-24 px-4">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Explorez par Catégorie</h1>
                    <p className="text-gray-600 text-lg">Trouvez exactement ce que vous cherchez en naviguant à travers nos collections spécialisées.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            href={`/shop?category=${cat.name}`}
                            className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all flex items-center gap-6"
                        >
                            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-colors ${cat.color} ${cat.hoverColor}`}>
                                <cat.icon className="w-10 h-10" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{cat.displayName}</h3>
                                <p className="text-gray-500 mb-4">{cat.description}</p>
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:translate-x-2 transition-transform">
                                    Voir les produits <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}

                    <Link
                        href="/shop"
                        className="group bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-6 md:col-span-2 relative overflow-hidden"
                    >
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />

                        <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                            <Wallet className="w-10 h-10" />
                        </div>
                        <div className="flex-1 relative z-10">
                            <h3 className="text-xl font-bold text-white mb-2">Tout Parcourir</h3>
                            <p className="text-purple-100 mb-0">Découvrez l'ensemble de notre catalogue de produits.</p>
                        </div>
                        <div className="relative z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowRight className="w-5 h-5 text-purple-600" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
