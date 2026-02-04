import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // The user receiving the notification
    type: { type: String, enum: ['order_status', 'new_order', 'admin_alert'], required: true },
    message: { type: String, required: true },
    link: { type: String }, // Link to redirect (e.g. /orders/123)
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
