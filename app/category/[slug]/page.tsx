"use client";

import React, { useState, useEffect, use } from "react";
import ProductCard from "@/components/product/ProductCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    images: string[];
    image?: string;
    stock: number;
    isDeal?: boolean;
}

// Map french URL slugs to english DB categories
const CATEGORY_MAP: Record<string, string> = {
    "électronique": "Electronics",
    "electronique": "Electronics",
    "electronics": "Electronics",
    "mode": "Fashion",
    "fashion": "Fashion",
    "maison": "Home",
    "home": "Home",
    "sport": "Sports",
    "sports": "Sports",
};

// Reverse map for display title
const DISPLAY_MAP: Record<string, string> = {
    "Electronics": "Électronique",
    "Fashion": "Mode",
    "Home": "Maison",
    "Sports": "Sport",
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const decodedSlug = decodeURIComponent(slug).toLowerCase();
    const dbCategory = CATEGORY_MAP[decodedSlug];

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!dbCategory) return;

        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                if (data.products) {
                    const filtered = data.products.filter((p: Product) => p.category === dbCategory);
                    setProducts(filtered);
                }
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [dbCategory]);

    if (!dbCategory) {
        return notFound();
    }

    const displayTitle = DISPLAY_MAP[dbCategory] || dbCategory;

    return (
        <div className="min-h-screen bg-gray-50 py-24 px-4">
            <div className="container mx-auto">
                <div className="mb-8 flex items-center gap-4">
                    <Link href="/categories" className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <div className="text-sm text-gray-500 font-medium mb-1">Catégorie</div>
                        <h1 className="text-3xl font-bold text-gray-900 capitalize">{displayTitle}</h1>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Aucun produit trouvé</h2>
                        <p className="text-gray-500">Cette catégorie est vide pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
