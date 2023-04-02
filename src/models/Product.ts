import * as mongoose from "mongoose";
import { type IProduct } from "./types/product";
import { sizesArray } from "../enums/cart";

export const ProductSchema = new mongoose.Schema<IProduct, mongoose.Model<IProduct>, IProduct>(
    {
        title: {
            type: String,
            required: true,
            maxLength: 100,
            minlength: 3
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true,
            maxLength: 1000
        },
        sizes: {
            type: [
                {
                    type: String,
                    enum: sizesArray
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
        },
        image: {
            type: String
        },
        color: {
            type: String,
            required: true,
            maxLength: 50,
            minlength: 3
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            required: true
        }
    },
    { collection: "Products" }
);

export default mongoose.model("Product", ProductSchema);
export type ProductSchemaType = typeof ProductSchema;
