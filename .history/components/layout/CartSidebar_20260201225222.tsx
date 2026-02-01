"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/providers/CartProvider";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";

export default function CartSidebar() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
    const { isAuthenticated } = useAuth();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-purple-600" />
                                <h2 className="font-bold text-lg text-gray-900">Mon Panier ({cart.length})</h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
                                    <ShoppingBag className="w-16 h-16 opacity-20" />
                                    <p className="text-lg font-medium">Votre panier est vide</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-purple-600 font-semibold hover:underline"
                                    >
                                        Commencer vos achats
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.product._id} className="flex gap-4">
                                        <div className="w-20 h-20 bg-gray-100 rounded-xl relative overflow-hidden flex-shrink-0 border border-gray-100">
                                            {(item.product.images?.[0] || item.product.image) && (
                                                <Image
                                                    src={item.product.images?.[0] || item.product.image}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">{item.product.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.product._id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                        className="p-1 hover:bg-white rounded-md shadow-sm transition-all text-gray-600"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-base font-black w-6 text-center text-gray-500">{item.quantity}</span>
                                                    <button
                                                        onClick={() => {
                                                            if (item.quantity < item.product.stock) {
                                                                updateQuantity(item.product._id, item.quantity + 1);
                                                            }
                                                        }}
                                                        disabled={item.quantity >= item.product.stock}
                                                        className={`p-1 rounded-md shadow-sm transition-all ${item.quantity >= item.product.stock ? 'opacity-30 cursor-not-allowed text-gray-400' : 'hover:bg-white text-gray-600'}`}
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Sous-total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Livraison</span>
                                        <span className="text-green-600">Gratuite</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                                        <span>Total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {isAuthenticated ? (
                                        <Link
                                            href="/checkout"
                                            onClick={() => setIsCartOpen(false)}
                                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-[0.98]"
                                        >
                                            Paiement <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    ) : (
                                        <Link
                                            href="/login?redirect=/checkout"
                                            onClick={() => setIsCartOpen(false)}
                                            className="w-full py-4 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all"
                                        >
                                            Se connecter pour payer
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="w-full py-3 text-gray-500 font-medium hover:text-gray-900 transition-colors"
                                    >
                                        Continuer mes achats
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
