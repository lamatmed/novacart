"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/components/providers/CartProvider";
import Image from "next/image";
import { ShoppingBag, Check, Truck, ShieldCheck, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const { addToCart } = useCart();

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                if (data.product) {
                    setProduct(data.product);
                    const imgs = data.product.images || [];
                    if (imgs.length > 0) setSelectedImage(imgs[0]);
                    else if (data.product.image) setSelectedImage(data.product.image);
                }
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Produit introuvable</h2>
                <Link href="/" className="px-6 py-2 bg-black text-white rounded-full">Retour à l'accueil</Link>
            </div>
        );
    }

    const allImages = product.images && product.images.length > 0
        ? product.images
        : (product.image ? [product.image] : ['/placeholder.png']);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Retour
                </Link>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Image Gallery */}
                        <div className="p-8 bg-gray-50/50 flex flex-col gap-6">
                            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 group">
                                <Image
                                    src={selectedImage || allImages[0]}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                            </div>

                            {allImages.length > 1 && (
                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                    {allImages.map((img: string, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(img)}
                                            className={`relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-purple-600 ring-2 ring-purple-100 scale-95 opacity-100' : 'border-transparent hover:border-gray-200 opacity-70 hover:opacity-100'}`}
                                        >
                                            <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="p-8 md:p-12 flex flex-col h-full bg-white">
                            <div className="mb-auto">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-gray-400 text-sm">(4.9/5) • 124 avis</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{product.name}</h1>

                                <div className="flex items-baseline gap-4 mb-8">
                                    <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                                        {product.price}€
                                    </span>
                                    {product.oldPrice && (
                                        <span className="text-2xl text-gray-400 line-through decoration-gray-300">{product.oldPrice}€</span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-4 mb-8">
                                    <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border ${product.stock > 0 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                                        <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                                        {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-purple-50 text-purple-700 border border-purple-100 text-sm font-bold flex items-center gap-2">
                                        <Truck className="w-4 h-4" /> Livraison Gratuite
                                    </div>
                                </div>

                                <div className="prose prose-gray max-w-none text-gray-600 mb-10">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
                                    <p className="leading-relaxed">
                                        {product.description || "Profitez de ce produit exceptionnel, conçu pour répondre à vos besoins avec style et efficacité."}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-100 space-y-6 mt-auto">
                                <button
                                    onClick={() => addToCart(product)}
                                    disabled={product.stock <= 0}
                                    className="w-full py-5 bg-black text-white rounded-2xl font-bold text-xl hover:bg-gray-900 shadow-xl shadow-gray-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                                >
                                    <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    {product.stock > 0 ? 'Ajouter au panier' : 'Indisponible'}
                                </button>

                                <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-500">
                                    <div className="flex items-center gap-2 justify-center bg-gray-50 py-3 rounded-xl">
                                        <ShieldCheck className="w-5 h-5 text-purple-500" /> Garantie 2 ans
                                    </div>
                                    <div className="flex items-center gap-2 justify-center bg-gray-50 py-3 rounded-xl">
                                        <Check className="w-5 h-5 text-purple-500" /> Retours Gratuits
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
