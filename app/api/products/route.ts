import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET!;

// Helper to verify admin
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
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ products });
}

export async function POST(req: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    try {
        await connectDB();
        const body = await req.json();
        const product = await Product.create(body);
        return NextResponse.json({ message: "Product created", product }, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ message: "Error creating product", error: (error as Error).message }, { status: 500 });
    }
}
