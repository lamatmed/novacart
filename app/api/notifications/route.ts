import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Notification from "@/models/Notification";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

async function getUser() {
    const token = (await cookies()).get("token");
    if (!token) return null;
    try {
        const decoded: any = jwt.verify(token.value, JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}

export async function GET() {
    const user = await getUser();
    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectDB();
        // Fetch notifications for this user, sorted by newest
        const notifications = await Notification.find({ recipient: user.userId })
            .sort({ createdAt: -1 })
            .limit(20); // Limit to last 20

        const unreadCount = await Notification.countDocuments({ recipient: user.userId, read: false });

        return NextResponse.json({ notifications, unreadCount });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const user = await getUser();
    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectDB();
        const body = await req.json();
        const { id, markAll } = body;

        if (markAll) {
            await Notification.updateMany({ recipient: user.userId, read: false }, { read: true });
        } else if (id) {
            await Notification.findByIdAndUpdate(id, { read: true });
        }

        return NextResponse.json({ message: "Updated" });
    } catch (error) {
        console.error("Error updating notifications:", error);
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
