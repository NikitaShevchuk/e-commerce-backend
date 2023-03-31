import * as mongoose from "mongoose";
import { type IProduct, Sizes } from "./types/product";

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
            maxLength: 400
        },
        sizes: {
            type: [
                {
                    type: String,
                    enum: [Sizes.XS, Sizes.S, Sizes.MD, Sizes.L, Sizes.XL]
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
        }
    },
    { collection: "Products" }
);

export default mongoose.model("Product", ProductSchema);
export type ProductSchemaType = typeof ProductSchema;
