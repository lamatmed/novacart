"use client";

import React, { useEffect, useState } from "react";
import { Package, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, growth: "0%" });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/admin/dashboard");
                const data = await res.json();
                if (res.ok) {
                    setStats(data.stats);
                    setRecentOrders(data.recentOrders);
                }
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { name: "Revenu Total", value: `${stats.revenue}€`, icon: DollarSign, color: "bg-green-100 text-green-600" },
        { name: "Commandes", value: stats.orders, icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
        { name: "Produits", value: stats.products, icon: Package, color: "bg-purple-100 text-purple-600" },
        { name: "Croissance", value: stats.growth, icon: TrendingUp, color: "bg-orange-100 text-orange-600" },
    ];

    if (loading) return <div className="p-8 text-center text-gray-500">Chargement des statistiques...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
                <p className="text-gray-500">Vue d'ensemble de votre boutique</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Commandes Récentes</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Client</th>
                                <th className="px-4 py-3">Montant</th>
                                <th className="px-4 py-3">Statut</th>
                                <th className="px-4 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentOrders.length === 0 ? (
                                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Aucune commande récente</td></tr>
                            ) : (
                                recentOrders.map((order: any) => (
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-black">#{order._id.slice(-6)}</td>
                                        <td className="px-4 py-3 text-black">{order.user?.name || "Invité"}</td>
                                        <td className="px-4 py-3 font-semibold text-black">{order.totalAmount}€</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                        ${order.status === 'livre' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'en_attente' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-gray-100 text-gray-700'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-black text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
