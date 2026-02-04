import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import Notification from "@/models/Notification";

const JWT_SECRET = process.env.JWT_SECRET!;

// Helper to get current user
async function getCurrentUser() {
    const token = (await cookies()).get("token");
    if (!token) return null;
    try {
        const decoded: any = jwt.verify(token.value, JWT_SECRET);
        return decoded.userId;
    } catch (error) {
        return null;
    }
}

export async function POST(req: Request) {
    try {
        const userId = await getCurrentUser();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const body = await req.json();
        const { items, totalAmount, shippingAddress, paymentProof } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
        }

        // Verify stock for each item
        for (const item of items) {
            const product = await Product.findById(item.product._id);
            if (!product) {
                return NextResponse.json({ message: `Product ${item.product.name} not found` }, { status: 404 });
            }
            if (product.stock < item.quantity) {
                return NextResponse.json({ message: `Insufficient stock for ${product.name}` }, { status: 400 });
            }
        }

        // Deduct stock
        // Deduct stock - MOVED TO ADMIN VALIDATION
        // User requested: "si user passe commande en attente ne doit pas compter de stock"
        // for (const item of items) {
        //     await Product.findByIdAndUpdate(item.product._id, {
        //         $inc: { stock: -item.quantity }
        //     });
        // }

        // Create Order
        const order = await Order.create({
            user: userId,
            items: items.map((item: any) => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            totalAmount,
            shippingAddress,
            paymentProof,
            status: 'en_attente' // Wait for admin verification
        });

        // Notify Admins
        const admins = await User.find({ role: 'admin' });
        for (const admin of admins) {
            await Notification.create({
                recipient: admin._id,
                type: 'new_order',
                message: `Nouvelle commande (${order._id.toString().slice(-6)}) reçue. Montant: ${totalAmount}€`,
                link: '/admin/orders'
            });
        }

        return NextResponse.json({ message: "Order created", order }, { status: 201 });

    } catch (error) {
        console.error("Order creation error:", error);
        return NextResponse.json({ message: "Error creating order" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const userId = await getCurrentUser();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const orders = await Order.find({ user: userId })
            .populate("items.product")
            .sort({ createdAt: -1 });

        return NextResponse.json({ orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return NextResponse.json({ message: "Error fetching orders" }, { status: 500 });
    }
}
