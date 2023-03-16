import * as mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 100
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true,
            maxLength: 400
        },
        sizes: {
            type: [
                {
                    type: String,
                    enum: ["XS", "S", "MD", "L", "XL"]
                }
            ]
        },
        isFavorite: {
            type: Boolean,
            required: true
        },
        productIsNew: {
            type: Boolean,
            required: true
        }
    },
    { collection: "Products" }
);

export default mongoose.model("ProductSchema", ProductSchema);
export type ProductType = typeof ProductSchema;
