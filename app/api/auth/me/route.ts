import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token.value, JWT_SECRET) as JwtPayload;

        if (!decoded || !decoded.userId) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }

        await connectToDatabase();
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Auth verify error:", error);
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        );
    }
}
