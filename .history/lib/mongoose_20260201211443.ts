import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Global interface to prevent hot-reload connection leaks in dev
declare global {
    var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        // Build hack: Force Google DNS to resolve MongoDB connection issues
        try {
            const dns = await import('dns');
            dns.setServers(['8.8.8.8', '8.8.4.4']);
            console.log("DNS servers set to Google DNS (8.8.8.8)");
        } catch (err) {
            console.error("Failed to set custom DNS:", err);
        }

        const opts = {
            bufferCommands: false,
            family: 4, // Force IPv4
        };

        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectToDatabase;
