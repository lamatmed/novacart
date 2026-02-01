import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Order from "@/models/Order";
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

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();
        const { status } = body;

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Order updated", order: updatedOrder });
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ message: "Error updating order" }, { status: 500 });
    }
}
