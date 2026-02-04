/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CreditCard, Truck, CheckCircle, Upload } from "lucide-react";

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const { user, loading: authLoading, isAuthenticated } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success

    const [shipping, setShipping] = useState({
        address: "",
        city: "",
        postalCode: "",
        country: "France",
        phone: "",
    });
    const [paymentFile, setPaymentFile] = useState<File | null>(null);

    const currencyConfig: { [key: string]: { symbol: string, rate: number } } = {
        "France": { symbol: "€", rate: 0.92 },
        "USA": { symbol: "$", rate: 1 },
        "UAE": { symbol: "AED", rate: 3.67 },
        "Mauritanie": { symbol: "MRU", rate: 40 },
        "Angola": { symbol: "Kz", rate: 920 }
    };

    const { symbol, rate } = currencyConfig[shipping.country] || currencyConfig["USA"];

    const formatPrice = (price: number) => {
        return `${(price * rate).toFixed(2)} ${symbol}`;
    };

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login?redirect=/checkout");
        }
        if (!authLoading && isAuthenticated && cart.length === 0 && step !== 3) {
            router.push("/shop");
        }
    }, [authLoading, isAuthenticated, cart, router, step]);

    const handleCreateOrder = async () => {
        if (!paymentFile) {
            alert("Veuillez télécharger une preuve de paiement (screenshot).");
            return;
        }

        setLoading(true);
        try {
            // 1. Upload Payment Proof
            const uploadData = new FormData();
            uploadData.append("file", paymentFile);

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });
            const uploadJson = await uploadRes.json();

            if (!uploadRes.ok) {
                throw new Error("Failed to upload payment proof");
            }

            const paymentProofUrl = uploadJson.url;

            // 2. Create Order
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cart,
                    totalAmount: cartTotal,
                    shippingAddress: shipping,
                    paymentProof: paymentProofUrl
                }),
            });

            if (res.ok) {
                clearCart();
                setStep(3);
            } else {
                alert("Une erreur est survenue lors de la commande.");
            }
        } catch (error) {
            console.error(error);
            alert("Erreur lors du traitement de la commande.");
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || (!isAuthenticated && !step)) return <div>Loading...</div>;

    if (step === 3) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Merci !</h1>
                    <p className="text-gray-500 mb-8">Votre commande a été confirmée avec succès.</p>
                    <button
                        onClick={() => router.push("/shop")}
                        className="w-full py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                    >
                        Retour à la boutique
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-24 px-4">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Paiement</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Forms */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Shipping Address */}
                        <div className={`bg-white p-6 rounded-2xl shadow-sm border ${step === 1 ? 'border-purple-200 ring-4 ring-purple-50' : 'border-gray-100'}`}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
                                <h2 className="text-xl font-bold text-gray-900">Adresse de livraison</h2>
                            </div>

                            {step === 1 && (
                                <div className="space-y-4 max-w-lg ml-14">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-black"
                                            value={shipping.address}
                                            onChange={e => setShipping({ ...shipping, address: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-black"
                                            value={shipping.phone}
                                            onChange={e => setShipping({ ...shipping, phone: e.target.value })}
                                            placeholder="+33 6 12 34 56 78"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-black"
                                                value={shipping.city}
                                                onChange={e => setShipping({ ...shipping, city: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Code Postal</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-black"
                                                value={shipping.postalCode}
                                                onChange={e => setShipping({ ...shipping, postalCode: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                                        <select
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-black"
                                            value={shipping.country}
                                            onChange={e => setShipping({ ...shipping, country: e.target.value })}
                                        >
                                            <option value="France">France</option>
                                            <option value="USA">USA</option>
                                            <option value="UAE">UAE</option>
                                            <option value="Mauritanie">Mauritanie</option>
                                            <option value="Angola">Angola</option>
                                        </select>
                                    </div>

                                    <button
                                        onClick={() => {
                                            if (shipping.address && shipping.city && shipping.postalCode && shipping.phone) setStep(2);
                                            else alert("Veuillez remplir tous les champs");
                                        }}
                                        className="mt-4 px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                                    >
                                        Continuer vers le paiement
                                    </button>
                                </div>
                            )}
                            {step > 1 && (
                                <div className="ml-14 text-gray-600">
                                    <p>{shipping.address}</p>
                                    <p>{shipping.postalCode} {shipping.city}, {shipping.country}</p>
                                    <p className="text-sm text-gray-500 mt-1">{shipping.phone}</p>
                                    <button onClick={() => setStep(1)} className="text-purple-600 text-sm hover:underline mt-2">Modifier</button>
                                </div>
                            )}
                        </div>

                        {/* Payment */}
                        <div className={`bg-white p-6 rounded-2xl shadow-sm border ${step === 2 ? 'border-purple-200 ring-4 ring-purple-50' : 'border-gray-100'}`}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                                <h2 className="text-xl font-bold text-gray-900">Paiement</h2>
                            </div>

                            {step === 2 && (
                                <div className="ml-14 max-w-lg">
                                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-6">
                                        <p className="font-semibold text-purple-900 mb-2">Instructions de paiement</p>
                                        <p className="text-sm text-purple-800 mb-4">
                                            Veuillez effectuer votre virement/paiement via votre application bancaire, puis téléchargez une capture d'écran (screenshot) ci-dessous comme preuve.
                                        </p>

                                        <label className="block w-full cursor-pointer">
                                            <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-purple-300 border-dashed rounded-lg bg-white hover:bg-purple-50 transition-colors">
                                                {paymentFile ? (
                                                    <div className="relative w-full h-full p-2 flex items-center justify-center">
                                                        <Image
                                                            src={URL.createObjectURL(paymentFile)}
                                                            alt="Payment Proof"
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Upload className="w-8 h-8 text-purple-400 mb-2" />
                                                        <p className="text-sm text-gray-500"><span className="font-semibold">Cliquez pour upload</span></p>
                                                        <p className="text-xs text-gray-400">IMG, PNG, JPG</p>
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        setPaymentFile(e.target.files[0]);
                                                    }
                                                }}
                                            />
                                        </label>
                                        {paymentFile && (
                                            <p className="text-center text-xs text-green-600 font-medium mt-2">
                                                Fichier sélectionné : {paymentFile.name}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleCreateOrder}
                                        disabled={loading}
                                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? "Envoi de la preuve..." : `Confirmer le paiement`}
                                    </button>
                                    <button onClick={() => setStep(1)} className="mt-4 text-gray-500 hover:text-black w-full text-center">Retour</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-lg text-gray-900 mb-6">Résumé de la commande</h3>
                            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                                {cart.map((item) => (
                                    <div key={item.product._id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg relative overflow-hidden flex-shrink-0">
                                            {(item.product.images?.[0] || item.product.image) && (
                                                <Image
                                                    src={item.product.images?.[0] || item.product.image}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 text-sm line-clamp-2">{item.product.name}</p>
                                            <p className="text-gray-500 text-xs">Qté: {item.quantity}</p>
                                            <p className="font-bold text-gray-900 text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Sous-total</span>
                                    <span>{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Livraison</span>
                                    <span className="text-green-600">Gratuite</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 pt-4">
                                    <span>Total</span>
                                    <span>{formatPrice(cartTotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
