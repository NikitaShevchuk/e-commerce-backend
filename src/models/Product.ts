import * as mongoose from "mongoose";

export interface IProduct extends Document {
    _id: number;
    title: string;
    price: number;
    description: string;
    sizes: string[];
    isFavorite: boolean;
    productIsNew: boolean;
    image: string;
    color: string;
    userId: mongoose.Types.ObjectId | undefined;
}

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
        },
        image: {
            type: String,
            required: true
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
