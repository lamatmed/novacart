import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

async function isAdmin() {
    const token = (await cookies()).get("token");
    if (!token) return false;
    try {
        const decoded: any = jwt.verify(token.value, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        return user && user.role === "admin";
    } catch (error) {
        return false;
    }
}

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    try {
        await connectDB();

        // 1. Basic Stats
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        const orders = await Order.find({ status: { $ne: 'annule' } });
        const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        // 2. Monthly Revenue (Mocked for now or aggregated)
        // Let's do a simple aggregation for the last 6 months or 7 days
        // Group by Date for graph
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        const dailyRevenue = await Promise.all(last7Days.map(async (date) => {
            const dayStart = new Date(date);
            const dayEnd = new Date(date);
            dayEnd.setHours(23, 59, 59, 999);

            const dayOrders = await Order.find({
                createdAt: { $gte: dayStart, $lte: dayEnd },
                status: { $ne: 'annule' }
            });
            const amount = dayOrders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
            return { date, amount };
        }));


        // 3. Top Products
        // We need to aggregate all items from all orders
        // This acts as a simple "Best Sellers"
        const productSales: { [key: string]: number } = {};
        orders.forEach(order => {
            order.items.forEach((item: any) => {
                // some items might not have product populated or product was deleted, check existence
                if (item.product) {
                    const pid = item.product.toString(); // assuming it's an ID if not populated, but we requested simple find. 
                    // Actually we need to populate to get names if we want to display them effortlessly here? 
                    // Or we just hold IDs and do a lookup. 
                    // Let's do a separate aggregation properly.
                }
            });
        });

        // Let's use a real aggregation for top products
        const topProductsAgg = await Order.aggregate([
            { $unwind: "$items" },
            { $group: { _id: "$items.product", totalSold: { $sum: "$items.quantity" } } },
            { $sort: { totalSold: -1 } },
            { $limit: 5 }
        ]);

        const topProducts = await Promise.all(topProductsAgg.map(async (p) => {
            const product = await Product.findById(p._id).select("name price images image");
            return {
                ...p,
                name: product ? product.name : "Produit supprimé",
                price: product ? product.price : 0,
                image: product ? (product.images?.[0] || product.image) : null
            };
        }));


        // 4. Sales by Category
        // We need to look up products for category info
        // This is expensive without a lookup, let's skip for simple V1 or do it if needed.
        // Let's stick to Revenue, Orders, Users, Top Products for the "Analytics" page.

        return NextResponse.json({
            stats: {
                revenue: totalRevenue,
                orders: totalOrders,
                users: totalUsers,
                products: totalProducts,
                averageOrderValue: totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0
            },
            dailyRevenue,
            topProducts
        });

    } catch (error) {
        console.error("Analytics Error:", error);
        return NextResponse.json({ message: "Error fetching analytics" }, { status: 500 });
    }
}
