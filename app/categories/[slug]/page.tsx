"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Mapping slugs (url) to database category names
const CATEGORY_MAP: Record<string, string> = {
    "electronics": "Electronics",
    "electronique": "Electronics",
    "électronique": "Electronics",

    "fashion": "Fashion",
    "mode": "Fashion",

    "home": "Home",
    "maison": "Home",
    "maison-&-déco": "Home",
    "maison-deco": "Home",

    "sports": "Sports",
    "sport": "Sports"
};

const CATEGORY_TITLES: Record<string, string> = {
    "Electronics": "Électronique & High-Tech",
    "Fashion": "Mode & Tendances",
    "Home": "Maison & Décoration",
    "Sports": "Sports & Loisirs"
};

export default function CategoryPage() {
    const { slug } = useParams();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const categoryKey = Array.isArray(slug) ? slug[0] : slug;
    const safeSlug = decodeURIComponent(categoryKey || "").toLowerCase();

    const dbCategory = CATEGORY_MAP[safeSlug] ||
        Object.values(CATEGORY_MAP).find(v => v.toLowerCase() === safeSlug) ||
        null;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                if (data.products) {
                    const filtered = data.products.filter((p: any) =>
                        (dbCategory && p.category === dbCategory) ||
                        p.category.toLowerCase() === safeSlug
                    );
                    setProducts(filtered);
                }
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [dbCategory, safeSlug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-24 px-4">
            <div className="container mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Retour à l'accueil
                </Link>

                <div className="mb-12">
                    <div className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 font-bold text-sm mb-4 uppercase tracking-wider">
                        Collection
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {dbCategory ? (CATEGORY_TITLES[dbCategory] || dbCategory) : (decodeURIComponent(categoryKey || "Catégorie inconnue"))}
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl">
                        Découvrez notre sélection de produits dans cette catégorie.
                    </p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun produit trouvé</h3>
                        <p className="text-gray-500">Cette catégorie ne contient aucun produit pour le moment.</p>
                        <Link href="/shop" className="inline-block mt-4 text-purple-600 hover:underline">Voir toute la boutique</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
