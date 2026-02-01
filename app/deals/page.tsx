"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/components/providers/CartProvider";
import { ShoppingCart, Tag, Clock } from "lucide-react";
import Link from "next/link";

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
    stock: number;
    isDeal: boolean;
}

export default function DealsPage() {
    const [deals, setDeals] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                if (data.products) {
                    // Filter for deals on the client side for now, 
                    // ideally this should be a query parameter to the API like /api/products?deals=true
                    const dealProducts = data.products.filter((p: Product) => p.isDeal);
                    setDeals(dealProducts);
                }
            } catch (error) {
                console.error("Failed to load deals", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDeals();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-24 px-4">
            <div className="container mx-auto">
                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-600 text-sm font-bold mb-4">
                        OFFRES LIMITÉES
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nos Meilleures Offres</h1>
                    <p className="text-gray-600 text-lg">Profitez de réductions exclusives sur une sélection de nos meilleurs produits. Faites vite, les stocks sont limités !</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                    </div>
                ) : deals.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pas d'offres pour le moment</h2>
                        <p className="text-gray-500 mb-8">Revenez plus tard pour découvrir nos promotions !</p>
                        <Link href="/shop" className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors">
                            Voir toute la boutique
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {deals.map((product) => (
                            <div key={product._id} className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-red-500/10 transition-all group relative">
                                {/* Badge promo */}
                                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    <Tag className="w-3 h-3" /> PROMO
                                </div>

                                <div className="aspect-square relative bg-gray-100 overflow-hidden">
                                    {product.image && (
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    )}
                                    {product.stock <= 0 && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <span className="text-white font-bold px-4 py-2 border-2 border-white rounded-full">Épuisé</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-gray-900 mb-1 text-lg truncate">{product.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-red-500 font-bold line-through">${(product.price * 1.2).toFixed(2)}</span>
                                            <span className="text-xl font-bold text-gray-900">${product.price}</span>
                                        </div>
                                        <button
                                            onClick={() => addToCart(product)}
                                            disabled={product.stock <= 0}
                                            className="p-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
