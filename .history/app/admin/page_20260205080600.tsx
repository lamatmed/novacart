
"use client";

import React, { useEffect, useState } from "react";
import { Package, ShoppingBag, DollarSign, TrendingUp, Users, MoreVertical, ExternalLink, Clock, CheckCircle, XCircle } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0, growth: "0%" });
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
        { 
            name: "Revenu Total", 
            value: `${stats.revenue.toLocaleString('fr-FR')}€`, 
            icon: DollarSign, 
            color: "from-emerald-400 to-emerald-500", 
            bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
            trend: "+12.5%"
        },
        { 
            name: "Commandes", 
            value: stats.orders.toLocaleString('fr-FR'), 
            icon: ShoppingBag, 
            color: "from-blue-400 to-blue-500", 
            bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
            trend: "+8.2%"
        },
        { 
            name: "Produits", 
            value: stats.products.toLocaleString('fr-FR'), 
            icon: Package, 
            color: "from-purple-400 to-purple-500", 
            bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
            trend: "+5.3%"
        },
        { 
            name: "Croissance", 
            value: stats.growth, 
            icon: TrendingUp, 
            color: "from-amber-400 to-amber-500", 
            bgColor: "bg-gradient-to-br from-amber-50 to-amber-100",
            trend: "+2.1%"
        },
        { 
            name: "Utilisateurs", 
            value: stats.users.toLocaleString('fr-FR'), 
            icon: Users, 
            color: "from-pink-400 to-pink-500", 
            bgColor: "bg-gradient-to-br from-pink-50 to-pink-100",
            trend: "+15.7%"
        },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'livre': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
            case 'en_attente': return <Clock className="w-4 h-4 text-amber-500" />;
            default: return <XCircle className="w-4 h-4 text-gray-400" />;
        }
    };

    if (loading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="space-y-2">
                    <div className="h-10 bg-gray-200 rounded-xl w-64"></div>
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Tableau de bord
                    </h1>
                    <p className="text-gray-500 mt-2">Vue d'ensemble et statistiques de votre boutique</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                        Exporter les données
                    </button>
                    <button className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all hover:scale-105">
                        + Nouvelle commande
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {statCards.map((stat) => (
                    <div key={stat.name} className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-sm border border-gray-200/50 group-hover:shadow-xl transition-all duration-300"></div>
                        <div className="relative bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-gray-200/30">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-2">{stat.name}</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                    <div className="flex items-center gap-1 mt-2">
                                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                                        <span className="text-sm text-emerald-600 font-medium">{stat.trend}</span>
                                        <span className="text-xs text-gray-400 ml-2">ce mois</span>
                                    </div>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                                    <stat.icon className={`w-6 h-6 text-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200/50 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Commandes Récentes</h2>
                        <p className="text-sm text-gray-500 mt-1">Les dernières commandes de votre boutique</p>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700">
                        Voir tout
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/50">
                            {recentOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <ShoppingBag className="w-12 h-12 text-gray-300 mb-4" />
                                            <p className="text-gray-500">Aucune commande récente</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                recentOrders.map((order: any) => (
                                    <tr key={order._id} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                                    <ShoppingBag className="w-4 h-4 text-purple-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">#{order._id.slice(-8).toUpperCase()}</div>
                                                    <div className="text-xs text-gray-500">{order.items?.length || 0} articles</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-gray-900">{order.user?.name || "Invité"}</div>
                                                <div className="text-sm text-gray-500">{order.user?.email || order.shippingAddress?.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{order.totalAmount}€</div>
                                            <div className="text-xs text-gray-500">+{order.shippingFee || 0}€ livraison</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(order.status)}
                                                <span className={`px-3 py-1.5 rounded-full text-xs font-medium 
                                                    ${order.status === 'livre' ? 'bg-emerald-50 text-emerald-700' :
                                                        order.status === 'en_attente' ? 'bg-amber-50 text-amber-700' :
                                                            'bg-gray-100 text-gray-700'}`}>
                                                    {order.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">
                                                    {new Date(order.createdAt).toLocaleDateString('fr-FR', { 
                                                        day: 'numeric', 
                                                        month: 'short' 
                                                    })}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(order.createdAt).toLocaleTimeString('fr-FR', { 
                                                        hour: '2-digit', 
                                                        minute: '2-digit' 
                                                    })}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                <MoreVertical className="w-5 h-5 text-gray-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                
                {recentOrders.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-200/50 flex items-center justify-between text-sm text-gray-500">
                        <div>
                            Affichage de <span className="font-medium">{Math.min(5, recentOrders.length)}</span> commandes récentes
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded">Actualisé il y a 2 min</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}