import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["en_attente", "paye", "expedie", "livre", "annule"],
        default: "en_attente",
    },
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String,
        phone: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    paymentProof: {
        type: String,
    },
});

if (mongoose.models.Order) {
    delete mongoose.models.Order;
}

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
