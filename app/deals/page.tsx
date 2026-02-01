"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/components/providers/CartProvider";
import { ShoppingCart, Tag, Clock } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    images: string[];
    image?: string;
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
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
