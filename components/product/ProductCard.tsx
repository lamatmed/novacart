"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { motion, AnimatePresence } from "framer-motion";

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

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart, cart } = useCart();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Get current quantity in cart
    const cartItem = cart.find(item => item.product._id === product._id);
    const currentQty = cartItem ? cartItem.quantity : 0;
    const isOutOfStock = product.stock <= 0 || currentQty >= product.stock;

    // Combine legacy image and new images array
    const allImages = product.images && product.images.length > 0
        ? product.images
        : product.image
            ? [product.image]
            : [];

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    return (
        <div
            className={`bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all group h-full flex flex-col ${product.isDeal ? 'border-red-100 hover:shadow-red-500/10' : 'border-gray-100'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="aspect-square relative bg-gray-100 overflow-hidden">
                {product.isDeal && (
                    <div className="absolute top-4 left-4 z-20 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <Tag className="w-3 h-3" /> PROMO
                    </div>
                )}
                {allImages.length > 0 && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <Image
                                src={allImages[currentImageIndex]}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Stock Overlay */}
                {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                        <span className="text-white font-bold px-4 py-2 border-2 border-white rounded-full">Épuisé</span>
                    </div>
                )}

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all hover:bg-white z-10 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                        >
                            <ChevronLeft className="w-4 h-4 text-gray-800" />
                        </button>
                        <button
                            onClick={nextImage}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all hover:bg-white z-10 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                        >
                            <ChevronRight className="w-4 h-4 text-gray-800" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {allImages.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                        {product.category}
                    </div>
                    <div className={`text-xs font-black px-3 py-1 rounded-full shadow-sm ${product.stock > 0 ? 'bg-green-200 text-black' : 'bg-red-200 text-black'}`}>
                        Stock: {product.stock}
                    </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg truncate">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        {product.isDeal && (
                            <span className="text-xs text-red-500 font-bold line-through">${(product.price * 1.2).toFixed(2)}</span>
                        )}
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    </div>
                    <button
                        onClick={() => addToCart(product)}
                        disabled={isOutOfStock}
                        className={`p-3 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg ${product.isDeal ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-red-500/30' : 'bg-black hover:bg-gray-800 shadow-black/20'}`}
                        title={isOutOfStock ? "Stock épuisé ou max atteint" : "Ajouter au panier"}
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
