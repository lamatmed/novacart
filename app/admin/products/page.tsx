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
    images: string[];
    image?: string;
    isDeal: boolean;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Electronics",
        images: [] as string[],
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
            let imageUrls = [...formData.images];

            // Handle Image Uploads
            if (selectedFiles.length > 0) {
                for (const file of selectedFiles) {
                    const uploadData = new FormData();
                    uploadData.append("file", file);
                    const uploadRes = await fetch("/api/upload", {
                        method: "POST",
                        body: uploadData,
                    });
                    const uploadJson = await uploadRes.json();
                    if (uploadRes.ok) {
                        imageUrls.push(uploadJson.url);
                    }
                }
            }

            const method = editingId ? "PUT" : "POST";
            const url = editingId ? `/api/products/${editingId}` : "/api/products";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, images: imageUrls }),
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
            images: product.images || (product.image ? [product.image] : []),
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
        setFormData({ name: "", description: "", price: "", category: "Electronics", images: [], stock: "", isDeal: false });
        setSelectedFiles([]);
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
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 relative overflow-hidden group">
                                            {product.images && product.images[0] ? (
                                                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                            ) : product.image ? (
                                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                                            ) : null}
                                            {product.images && product.images.length > 1 && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[10px] font-bold">
                                                    +{product.images.length - 1}
                                                </div>
                                            )}
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

                            <label className="block text-sm font-medium text-gray-700 mb-1">Images du produit ({formData.images.length} actuelles)</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            // Append new files to existing selection
                                            setSelectedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                                        }
                                    }}
                                />
                                <div className="flex flex-col items-center gap-2">
                                    <Upload className="w-8 h-8 text-gray-400" />
                                    <p className="text-sm text-gray-500">
                                        Cliquez pour ajouter des images
                                    </p>
                                </div>
                            </div>

                            {/* Preview of NEW selected files */}
                            {selectedFiles.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-500 uppercase">Nouvelles images ({selectedFiles.length})</p>
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {selectedFiles.map((file, idx) => (
                                            <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 group">
                                                <Image
                                                    src={URL.createObjectURL(file)}
                                                    alt="Preview"
                                                    fill
                                                    className="object-cover"
                                                    onLoadingComplete={() => {
                                                        // URL.revokeObjectURL(url) - memory cleanup if possible, but tricky in map
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== idx))}
                                                    className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Preview of existing images */}
                            {formData.images.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-500 uppercase">Images existantes ({formData.images.length})</p>
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {formData.images.map((img, idx) => (
                                            <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 group">
                                                <Image src={img} alt="" fill className="object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({
                                                        ...formData,
                                                        images: formData.images.filter((_, i) => i !== idx)
                                                    })}
                                                    className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

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
