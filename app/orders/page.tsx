"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import Image from "next/image";

interface Order {
    _id: string;
    items: {
        product: {
            name: string;
            images: string[];
            image?: string;
            price: number;
        };
        quantity: number;
    }[];
    totalAmount: number;
    status: string;
    createdAt: string;
}

export default function UserOrdersPage() {
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login");
            return;
        }

        if (isAuthenticated) {
            fetchOrders();
        }
    }, [isAuthenticated, authLoading, router]);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/orders");
            const data = await res.json();
            if (data.orders) setOrders(data.orders);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'paye': return { label: 'Payé', color: 'bg-blue-100 text-blue-700', icon: CheckCircle };
            case 'expedie': return { label: 'Expédié', color: 'bg-purple-100 text-purple-700', icon: Truck };
            case 'livre': return { label: 'Livré', color: 'bg-green-100 text-green-700', icon: Package };
            case 'annule': return { label: 'Annulé', color: 'bg-red-100 text-red-700', icon: XCircle };
            default: return { label: 'En attente', color: 'bg-yellow-100 text-yellow-700', icon: Clock };
        }
    };

    if (authLoading || loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-24 px-4">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Commandes</h1>
                <p className="text-gray-500 mb-8">Suivez vos achats et retours</p>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <Package className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Vous n'avez pas encore de commande</h2>
                        <p className="text-gray-500 mb-6">Explorez notre boutique pour trouver des produits incroyables.</p>
                        <button onClick={() => router.push("/shop")} className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors">
                            Commencer les achats
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => {
                            const { label, color, icon: Icon } = getStatusInfo(order.status);

                            return (
                                <div key={order._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="p-6 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Commande N°</p>
                                            <p className="font-mono text-sm font-medium text-gray-900">#{order._id.slice(-8).toUpperCase()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Date</p>
                                            <p className="text-sm font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total</p>
                                            <p className="text-sm font-bold text-gray-900">${order.totalAmount.toFixed(2)}</p>
                                        </div>
                                        <div className={`px-3 py-1.5 rounded-full flex items-center gap-2 text-sm font-bold ${color}`}>
                                            <Icon className="w-4 h-4" />
                                            {label}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="flex gap-4 items-center">
                                                    <div className="w-16 h-16 bg-gray-100 rounded-lg relative overflow-hidden flex-shrink-0 border border-gray-100">
                                                        {(item.product?.images?.[0] || item.product?.image) && (
                                                            <Image
                                                                src={(item.product.images?.[0] || item.product.image) as string}
                                                                alt=""
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-900 line-clamp-1">{item.product?.name || "Produit supprimé"}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {item.quantity} x ${item.product?.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
