import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";

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

        // Count total products
        const productsCount = await Product.countDocuments();

        // Count total orders
        const ordersCount = await Order.countDocuments();

        // Calculate total revenue
        const orders = await Order.find({ status: { $ne: "annule" } }); // Exclude cancelled orders
        const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        // Calculate recent orders (last 5)
        const recentOrders = await Order.find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("user", "name email");

        // Real Growth Calculation (Monthly Revenue)
        const now = new Date();
        const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        const currentMonthRevenue = orders
            .filter(o => new Date(o.createdAt) >= startOfCurrentMonth)
            .reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        const previousMonthRevenue = orders
            .filter(o => {
                const date = new Date(o.createdAt);
                return date >= startOfPreviousMonth && date < startOfCurrentMonth;
            })
            .reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        let growthPermission = 0;
        if (previousMonthRevenue > 0) {
            growthPermission = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
        } else if (currentMonthRevenue > 0) {
            growthPermission = 100; // 100% growth if started from 0
        }

        const growth = `${growthPermission >= 0 ? '+' : ''}${growthPermission.toFixed(1)}%`;

        return NextResponse.json({
            stats: {
                products: productsCount,
                orders: ordersCount,
                revenue: totalRevenue,
                growth
            },
            recentOrders
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        return NextResponse.json({ message: "Error fetching stats" }, { status: 500 });
    }
}
