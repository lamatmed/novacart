import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import Notification from "@/models/Notification";

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
        const { status, shippingAddress } = body;

        const existingOrder = await Order.findById(id);
        if (!existingOrder) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        // Deduct stock if status changes to 'paye' (and wasn't already considered sold)
        const isSoldStatus = (s: string) => ['paye', 'expedie', 'livre'].includes(s);
        if (isSoldStatus(status) && !isSoldStatus(existingOrder.status)) {
            for (const item of existingOrder.items) {
                // Ensure item.product is just an ID (it should be unless populated)
                const productId = item.product._id || item.product;
                await Product.findByIdAndUpdate(productId, {
                    $inc: { stock: -item.quantity }
                });
            }
        }

        // Optional: Restore stock if cancelled (if desired, but risky if not requested)
        // if (status === 'annule' && isSoldStatus(existingOrder.status)) { ... }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            {
                status: status || existingOrder.status,
                ...(shippingAddress && { shippingAddress: { ...existingOrder.shippingAddress, ...shippingAddress } })
            },
            { new: true }
        );

        // Notify User
        if (existingOrder.status !== status) {
            await Notification.create({
                recipient: existingOrder.user,
                type: 'order_status',
                message: `Votre commande #${existingOrder._id.toString().slice(-6)} est passée au statut : ${status.replace('_', ' ').toUpperCase()}`,
                link: '/profile'
            });
        }

        return NextResponse.json({ message: "Order updated", order: updatedOrder });
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ message: "Error updating order" }, { status: 500 });
    }
}
