"use client";

import React, { useState, useEffect } from "react";
import { Package, Truck, CheckCircle, Clock, XCircle, Search, Eye, Download } from "lucide-react";
import Image from "next/image";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Order {
    _id: string;
    user: {
        name: string;
        email: string;
    };
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
    shippingAddress: {
        city: string;
        country: string;
        phone?: string;
    };
    paymentProof?: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedProof, setSelectedProof] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/admin/orders");
            const data = await res.json();
            if (data.orders) setOrders(data.orders);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/admin/orders/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                // Optimistic update
                setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };



    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paye': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'expedie': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'livre': return 'bg-green-100 text-green-700 border-green-200';
            case 'annule': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paye': return <CheckCircle className="w-4 h-4" />;
            case 'expedie': return <Truck className="w-4 h-4" />;
            case 'livre': return <Package className="w-4 h-4" />;
            case 'annule': return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const generateInvoice = (order: Order) => {
        const doc = new jsPDF();

        // Header
        doc.setFillColor(124, 58, 237); // Purple 600
        doc.rect(0, 0, 210, 40, 'F');

        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text("NovaCart", 14, 25);

        doc.setFontSize(10);
        doc.text("Facture Officielle", 14, 32);

        // Order Info
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text(`Commande #: ${order._id.toUpperCase()}`, 14, 50);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString('fr-FR')} ${new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`, 14, 56);
        doc.text(`Statut: ${order.status.replace('_', ' ').toUpperCase()}`, 14, 62);

        // Customer Info
        doc.text("FACTURÉ À:", 120, 50);
        doc.setFont("helvetica", "bold");
        doc.text(order.user?.name || "Invité", 120, 56);
        doc.setFont("helvetica", "normal");
        doc.text(order.user?.email || "", 120, 62);

        let yPos = 68;
        if (order.shippingAddress?.phone) {
            doc.text(`Tél: ${order.shippingAddress.phone}`, 120, yPos);
            yPos += 6;
        }

        doc.text(`${order.shippingAddress?.city || ''}, ${order.shippingAddress?.country || ''}`, 120, yPos);

        // Table
        const tableColumn = ["Produit", "Qté", "Prix Unit.", "Total"];
        const tableRows = order.items.map(item => [
            item.product.name,
            item.quantity,
            `$${item.product.price.toFixed(2)}`,
            `$${(item.product.price * item.quantity).toFixed(2)}`
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 80,
            headStyles: { fillColor: [124, 58, 237], textColor: 255 },
            alternateRowStyles: { fillColor: [243, 244, 246] },
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const finalY = doc.lastAutoTable.finalY || 80;

        // Total
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`Total Global: $${order.totalAmount.toFixed(2)}`, 140, finalY + 15);

        // Footer
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(128, 128, 128);
        doc.text("Merci pour votre confiance - NovaCart Inc.", 14, 280);

        doc.save(`facture_novacart_${order._id.slice(-6)}.pdf`);
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order._id.toLowerCase().includes(search.toLowerCase()) ||
            order.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
            order.user?.email.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = statusFilter === "All" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Commandes</h1>
                    <p className="text-gray-500">Gérer les achats clients</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Rechercher une commande..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-800"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">Tous les statuts</option>
                        <option value="en_attente">En attente</option>
                        <option value="paye">Payé</option>
                        <option value="expedie">Expédié</option>
                        <option value="livre">Livré</option>
                        <option value="annule">Annulé</option>
                    </select>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Commande</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Client</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Total</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Preuve</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-500">Chargement...</td></tr>
                        ) : filteredOrders.length === 0 ? (
                            <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-500">Aucune commande trouvée.</td></tr>
                        ) : (
                            filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs font-medium text-gray-500">#{order._id.slice(-6).toUpperCase()}</span>
                                        <div className="flex -space-x-2 mt-2 overflow-hidden">
                                            {order.items.slice(0, 3).map((item, i) => (
                                                <div key={i} className="relative w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden" title={item.product?.name}>
                                                    {(item.product.images?.[0] || item.product.image) && (
                                                        <Image
                                                            src={item.product.images?.[0] || item.product.image || ""}
                                                            alt=""
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                            {order.items.length > 3 && (
                                                <div className="relative w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                    +{order.items.length - 3}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{order.user?.name || "Guest"}</div>
                                        <div className="text-xs text-gray-600 font-medium">{order.user?.email}</div>
                                        {order.shippingAddress?.phone && (
                                            <div className="text-xs text-gray-800 font-semibold mt-0.5">{order.shippingAddress.phone}</div>
                                        )}
                                        <div className="text-xs text-gray-400 mt-1">
                                            {order.shippingAddress?.city}, {order.shippingAddress?.country}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</span>
                                            <span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        ${order.totalAmount.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.paymentProof ? (
                                            <div
                                                onClick={() => setSelectedProof(order.paymentProof!)}
                                                className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                                                title="Cliquez pour agrandir"
                                            >
                                                <Image
                                                    src={order.paymentProof}
                                                    alt="Preuve"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-gray-300 text-xs italic">Aucune</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            <span className="capitalize">{order.status.replace('_', ' ')}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <select
                                                className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-gray-300 transition-colors cursor-pointer text-black"
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                            >
                                                <option value="en_attente">En attente</option>
                                                <option value="paye">Payé</option>
                                                <option value="expedie">Expédié</option>
                                                <option value="livre">Livré</option>
                                                <option value="annule">Annulé</option>
                                            </select>
                                            <button
                                                onClick={() => generateInvoice(order)}
                                                className="p-1.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                title="Télécharger la facture"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {loading ? (
                    <div className="text-center text-gray-500 py-10">Chargement...</div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">Aucune commande trouvée.</div>
                ) : (
                    filteredOrders.map((order) => (
                        <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">
                            {/* Header: ID, Date, Status */}
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-2">
                                    <span className="font-mono text-sm font-bold text-gray-900">#{order._id.slice(-6).toUpperCase()}</span>
                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap w-fit ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        <span className="capitalize">{order.status.replace('_', ' ')}</span>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end gap-1">
                                    <div className="font-bold text-lg text-gray-900">${order.totalAmount.toFixed(2)}</div>
                                    <div className="flex flex-col items-end text-xs text-gray-500">
                                        <span className="font-medium">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</span>
                                        <span className="scale-90">{new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-50" />

                            {/* User & Shipping */}
                            <div className="space-y-1 relative">
                                <p className="text-sm font-bold text-gray-900">{order.user?.name || "Guest"}</p>
                                <p className="text-xs text-gray-600 font-medium">{order.user?.email}</p>
                                {order.shippingAddress?.phone && (
                                    <p className="text-xs text-gray-800 font-semibold">{order.shippingAddress.phone}</p>
                                )}
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <Truck className="w-3 h-3" />
                                    {order.shippingAddress?.city}, {order.shippingAddress?.country}
                                </p>
                            </div>

                            {/* Products Preview */}
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {order.items.map((item, i) => (
                                    <div key={i} className="relative w-12 h-12 rounded-lg border border-gray-100 flex-shrink-0 bg-gray-50 overflow-hidden">
                                        {(item.product.images?.[0] || item.product.image) && (
                                            <Image
                                                src={item.product.images?.[0] || item.product.image || ""}
                                                alt=""
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                        <div className="absolute bottom-0 right-0 bg-black/50 text-white text-[10px] px-1 font-bold rounded-tl-sm">
                                            x{item.quantity}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-3 items-end">
                                {/* Proof */}
                                <div>
                                    <span className="text-xs font-semibold text-gray-500 block mb-1">Preuve</span>
                                    {order.paymentProof ? (
                                        <div
                                            onClick={() => setSelectedProof(order.paymentProof!)}
                                            className="relative w-full h-12 rounded-lg overflow-hidden border border-gray-200 cursor-pointer bg-gray-50"
                                        >
                                            <Image
                                                src={order.paymentProof}
                                                alt="Preuve"
                                                fill
                                                className="object-cover opacity-80 hover:opacity-100"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Eye className="w-4 h-4 text-white drop-shadow-md" />
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-gray-400 italic">Aucune</span>
                                    )}
                                </div>

                                {/* Status Action */}
                                <div>
                                    <span className="text-xs font-semibold text-gray-500 block mb-1">Traiter</span>
                                    <select
                                        className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 mb-2"
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                    >
                                        <option value="en_attente">En attente</option>
                                        <option value="paye">Payé</option>
                                        <option value="expedie">Expédié</option>
                                        <option value="livre">Livré</option>
                                        <option value="annule">Annulé</option>
                                    </select>
                                    <button
                                        onClick={() => generateInvoice(order)}
                                        className="w-full py-2 flex items-center justify-center gap-2 bg-purple-50 text-purple-700 text-xs font-bold rounded-xl hover:bg-purple-100 transition-colors"
                                    >
                                        <Download className="w-3 h-3" />
                                        Facture PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Payment Proof Modal */}
            {
                selectedProof && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setSelectedProof(null)}>
                        <div className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] shadow-2xl" onClick={e => e.stopPropagation()}>
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-lg">Preuve de Paiement</h3>
                                <button onClick={() => setSelectedProof(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <XCircle className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>
                            <div className="relative w-full h-[60vh] bg-gray-100">
                                <Image
                                    src={selectedProof}
                                    alt="Preuve de paiement"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-sm text-gray-500">
                                Vérifiez que le montant et la date correspondent à la commande.
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
}
