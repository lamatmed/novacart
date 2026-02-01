import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product"; // Ensure Model is registered
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
    await connectDB();
    // Populate both user and product details
    const orders = await Order.find({})
        .populate("user", "name email")
        .populate("items.product")
        .sort({ createdAt: -1 });
    return NextResponse.json({ orders });
}
