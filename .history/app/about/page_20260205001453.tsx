"use client";

import React from "react";
import { Globe, CreditCard, ShieldCheck, MapPin, Building2, Wallet, Smartphone, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
    const countries = [
        {
            name: "France",
            currency: "Euro (€)",
            flag: "🇫🇷",
            color: "bg-blue-50 text-blue-700 border-blue-100",
            methods: ["Virement SEPA", "Carte Bancaire"],
            accounts: [
                { bank: "BNP Paribas", details: "IBAN: FR76 3000 4000 5000 6000 7000 80" },
            ]
        },
        {
            name: "USA",
            currency: "Dollar ($)",
            flag: "🇺🇸",
            color: "bg-red-50 text-red-700 border-red-100",
            methods: ["Wire Transfer", "Credit Card", "Zelle"],
            accounts: [
                { bank: "Chase Bank", details: "Routing: 021000021, Account: 123456789" },
            ]
        },
        {
            name: "UAE",
            currency: "Dirham (AED)",
            flag: "🇦🇪",
            color: "bg-emerald-50 text-emerald-700 border-emerald-100",
            methods: ["Bank Transfer", "Cash Deposit"],
            accounts: [
                { bank: "Emirates NBD", details: "IBAN: AE00 0000 0000 0000 000" },
            ]
        },
        {
            name: "Mauritanie",
            currency: "Ouguiya (MRU)",
            flag: "🇲🇷",
            color: "bg-green-50 text-green-700 border-green-100",
            methods: ["Bankily", "Masrvi", "Sadad"],
            accounts: [
                { bank: "Bankily", details: "Numéro: 48000000" },
                { bank: "Masrvi", details: "Numéro: 36000000" },
                { bank: "BIM", details: "Numéro: 000012345678" }
            ]
        },
        {
            name: "Angola",
            currency: "Kwanza (Kz)",
            flag: "🇦🇴",
            color: "bg-yellow-50 text-yellow-700 border-yellow-100",
            methods: ["Transferência Bancária", "Multicaixa"],
            accounts: [
                { bank: "Banco BAI", details: "IBAN: AO06 0000 0000 0000 0000 0" },
            ]
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Animation */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

                {/* Blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-40 -left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium mb-8 shadow-lg shadow-purple-500/20">
                        <Globe className="w-4 h-4" />
                        <span className="tracking-wide">NovaCart International</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
                        Le Shopping Sans <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 animate-gradient-x">Frontières.</span>
                    </h1>

                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
                        Nous simplifions vos achats internationaux en acceptant vos paiements locaux.
                        Sécurité, rapidité et transparence pour tous nos clients.
                    </p>
                </div>
            </div>

            {/* Trusted Features */}
            <div className="py-12 bg-gray-50 border-y border-gray-100">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 text-purple-600">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 mb-1">Paiements Sécurisés</h3>
                                <p className="text-sm text-gray-500">Transactions cryptées et vérifiées manuellement par nos équipes.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0 text-pink-600">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 mb-1">Devises Locales</h3>
                                <p className="text-sm text-gray-500">Payez en Ouguiya, Euro, Dollar ou Kwanza sans frais cachés.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 mb-1">Mobile Money</h3>
                                <p className="text-sm text-gray-500">Support natif pour Bankily, Masrvi, Sadad et autres solutions mobiles.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Methods Grid */}
            <div className="py-24 px-4 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Nos Comptes Bancaires</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            Sélectionnez le compte correspondant à votre pays de résidence pour effectuer votre paiement.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {countries.map((country) => (
                            <div key={country.name} className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 overflow-hidden">
                                {/* Header */}
                                <div className={`px-8 py-8 ${country.color} bg-opacity-20`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-5xl shadow-sm rounded-full bg-white p-2">{country.flag}</span>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-white/50 backdrop-blur-sm`}>
                                            {country.currency}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-1">{country.name}</h3>
                                    <p className="text-sm opacity-80 font-medium">Comptes disponibles</p>
                                </div>

                                {/* Content */}
                                <div className="p-8 space-y-6">
                                    {/* Methods Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {country.methods.map((method) => (
                                            <span key={method} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700">
                                                <CreditCard className="w-3 h-3 text-gray-400" />
                                                {method}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Accounts List */}
                                    <div className="space-y-4">
                                        {country.accounts.map((account, idx) => (
                                            <div key={idx} className="relative p-4 rounded-xl bg-gray-50 border border-gray-100 group-hover:bg-purple-50/30 group-hover:border-purple-100 transition-colors">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-700">
                                                        <Building2 className="w-4 h-4" />
                                                    </div>
                                                    <p className="font-bold text-gray-900">{account.bank}</p>
                                                </div>
                                                <div className="pl-11">
                                                    <p className="font-mono text-xs text-gray-600 break-all bg-white px-3 py-2 rounded-lg border border-gray-100 shadow-sm">
                                                        {account.details}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Accent */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-purple-400 transition-all opacity-50"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
