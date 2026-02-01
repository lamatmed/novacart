import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-2xl w-full text-center space-y-8">

                {/* Animated 404 Illustration */}
                <div className="relative h-64 w-full flex items-center justify-center">
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

                    <h1 className="text-[150px] font-black leading-none bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-transparent bg-clip-text drop-shadow-sm select-none">
                        404
                    </h1>

                    {/* Search Icon floating overlay */}
                    <div className="absolute top-1/2 right-1/4 -translate-y-8 animate-bounce delay-75">
                        <Search className="w-12 h-12 text-gray-400/50 rotate-12" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-gray-900">Oups ! Cette page s'est perdue.</h2>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        La page que vous recherchez semble introuvable. Elle a peut-être été déplacée ou supprimée.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
                    >
                        <Home className="w-5 h-5" />
                        Retour à l'accueil
                    </Link>

                    <Link
                        href="/shop"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 hover:border-purple-200 hover:text-purple-600 hover:shadow-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Explorer la boutique
                    </Link>
                </div>

                <div className="pt-12 text-gray-400 text-sm">
                    Code erreur: 404 NOT_FOUND
                </div>
            </div>
        </div>
    );
}
