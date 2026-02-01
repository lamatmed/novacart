"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Upload } from "lucide-react";
import Image from "next/image";

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    image: string;
    isDeal: boolean;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Clothing",
        image: "",
        stock: "",
        isDeal: false,
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.products) setProducts(data.products);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let imageUrl = formData.image;

            // Handle Image Upload
            if (selectedFile) {
                const uploadData = new FormData();
                uploadData.append("file", selectedFile);
                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: uploadData,
                });
                const uploadJson = await uploadRes.json();
                if (uploadRes.ok) {
                    imageUrl = uploadJson.url;
                } else {
                    throw new Error("Image upload failed");
                }
            }

            const method = editingId ? "PUT" : "POST";
            const url = editingId ? `/api/products/${editingId}` : "/api/products";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, image: imageUrl }),
            });
            if (res.ok) {
                setIsModalOpen(false);
                fetchProducts();
                resetForm();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (product: any) => {
        setEditingId(product._id);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            image: product.image,
            stock: product.stock,
            isDeal: product.isDeal || false,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;
        try {
            const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
            if (res.ok) fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    const resetForm = () => {
        setFormData({ name: "", description: "", price: "", category: "Clothing", image: "", stock: "", isDeal: false });
        setSelectedFile(null);
        setEditingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Produits</h1>
                    <p className="text-gray-500">Gérer votre catalogue</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Ajouter
                </button>
            </div>

            {/* Product List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Produit</th>
                            <th className="hidden sm:table-cell px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Catégorie</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Prix</th>
                            <th className="hidden md:table-cell px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    Aucun produit trouvé. Ajoutez-en un !
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 relative overflow-hidden">
                                            {product.image && <Image src={product.image} alt={product.name} fill className="object-cover" />}
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-900 block">{product.name}</span>
                                            {product.isDeal && <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-600">PROMO</span>}
                                        </div>
                                    </td>
                                    <td className="hidden sm:table-cell px-6 py-4 text-gray-600">{product.category}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">${product.price}</td>
                                    <td className="hidden md:table-cell px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {product.stock > 0 ? `${product.stock} en stock` : 'Épuisé'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-blue-600"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-600"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">{editingId ? "Modifier un produit" : "Ajouter un produit"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-black placeholder:text-gray-400"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-black placeholder:text-gray-400"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-black placeholder:text-gray-400"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-black placeholder:text-gray-400"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-black"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Electronics">Électronique</option>
                                    <option value="Fashion">Mode</option>
                                    <option value="Home">Maison</option>
                                    <option value="Sports">Sport</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                                <input
                                    type="checkbox"
                                    id="isDeal"
                                    checked={formData.isDeal}
                                    onChange={e => setFormData({ ...formData, isDeal: e.target.checked })}
                                    className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                                />
                                <label htmlFor="isDeal" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                                    Promouvoir ce produit (Offre Spéciale)
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image du produit</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                setSelectedFile(e.target.files[0]);
                                            }
                                        }}
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload className="w-8 h-8 text-gray-400" />
                                        <p className="text-sm text-gray-500">
                                            {selectedFile ? selectedFile.name : "Cliquez ou glissez une image ici"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 font-medium disabled:opacity-50"
                                >
                                    {isLoading ? "Enregistrement..." : (editingId ? "Mettre à jour" : "Ajouter")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
