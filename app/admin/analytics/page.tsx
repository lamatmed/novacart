"use client";

import React, { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Users, Package, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";

export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await fetch("/api/admin/analytics");
                const json = await res.json();
                if (res.ok) {
                    setData(json);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
    );

    if (!data) return <div>Erreur de chargement.</div>;

    // Calculate max value for simple chart scaling
    const maxRevenue = Math.max(...data.dailyRevenue.map((d: any) => d.amount), 10);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-500">Vue détaillée des performances de votre boutique</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Revenu Total</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{data.stats.revenue.toLocaleString()} €</h3>
                        <p className="text-xs text-green-600 flex items-center mt-2 font-medium">
                            <TrendingUp className="w-3 h-3 mr-1" /> Global
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                        <DollarSign className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Commandes</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{data.stats.orders}</h3>
                        <p className="text-xs text-blue-600 flex items-center mt-2 font-medium">
                            <ShoppingBag className="w-3 h-3 mr-1" /> Total
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Clients</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{data.stats.users}</h3>
                        <p className="text-xs text-purple-600 flex items-center mt-2 font-medium">
                            <Users className="w-3 h-3 mr-1" /> Inscrits
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                        <Users className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Panier Moyen</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{data.stats.averageOrderValue} €</h3>
                        <p className="text-xs text-orange-600 flex items-center mt-2 font-medium">
                            <ArrowUpRight className="w-3 h-3 mr-1" /> Par commande
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                        <DollarSign className="w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart (CSS only) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-gray-900 text-lg">Revenus (7 derniers jours)</h3>
                        <div className="p-2 bg-gray-50 rounded-lg">
                            <Calendar className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-2 sm:gap-4">
                        {data.dailyRevenue.map((day: any) => (
                            <div key={day.date} className="group relative flex-1 flex flex-col items-center gap-2">
                                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs py-1 px-2 rounded mb-2">
                                    {day.amount} €
                                </div>
                                <div
                                    className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg hover:opacity-80 transition-all cursor-pointer"
                                    style={{ height: `${(day.amount / maxRevenue) * 100}%`, minHeight: '4px' }}
                                ></div>
                                <span className="text-xs text-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
                                    {new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-lg mb-6">Meilleures Ventes</h3>
                    <div className="space-y-4">
                        {data.topProducts.map((p: any, i: number) => (
                            <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                                <span className="font-bold text-gray-300 text-lg w-6">#{i + 1}</span>
                                <div className="w-12 h-12 bg-gray-100 rounded-xl relative overflow-hidden flex-shrink-0">
                                    {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 truncate group-hover:text-purple-600 transition-colors">{p.name}</h4>
                                    <p className="text-xs text-gray-500">{p.totalSold} vendus</p>
                                </div>
                                <span className="font-bold text-sm text-gray-900">{p.price}€</span>
                            </div>
                        ))}
                        {data.topProducts.length === 0 && (
                            <p className="text-sm text-gray-500 text-center py-4">Aucune vente pour le moment.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
