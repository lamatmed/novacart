import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    image: {
        type: String, // Keep for backward compatibility
    },
    stock: {
        type: Number,
        default: 0,
    },
    isDeal: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Force model recompilation/hot-reload to apply schema changes
if (mongoose.models.Product) {
    delete mongoose.models.Product;
}

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
