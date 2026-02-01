"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useCart } from "@/components/providers/CartProvider";
import { ShoppingCart, Filter, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
    stock: number;
}

function ShopContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "All";

    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    // Filters
    const [category, setCategory] = useState(initialCategory);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                if (data.products) {
                    setProducts(data.products);
                    setFilteredProducts(data.products);
                }
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;

        if (category !== "All") {
            result = result.filter(p => p.category === category);
        }

        if (search) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredProducts(result);
    }, [category, search, products]);

    const categories = ["All", "Electronics", "Fashion", "Home", "Sports"];

    return (
        <div className="min-h-screen bg-gray-50 py-24 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Boutique</h1>
                        <p className="text-gray-500">Découvrez nos produits exclusifs</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${category === cat
                                        ? "bg-black text-white shadow-lg"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    {cat === "All" ? "Tous" : cat === "Electronics" ? "Électronique" : cat === "Fashion" ? "Mode" : cat === "Home" ? "Maison" : cat === "Sports" ? "Sport" : cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        Aucun produit ne correspond à votre recherche.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
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
                                    <div className="text-xs font-semibold text-purple-600 mb-2 uppercase tracking-wide">
                                        {product.category}
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1 text-lg truncate">{product.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                                        <button
                                            onClick={() => addToCart(product)}
                                            disabled={product.stock <= 0}
                                            className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
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

export default function ShopPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShopContent />
        </Suspense>
    );
}
