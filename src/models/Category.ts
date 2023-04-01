import * as mongoose from "mongoose";
import { type ICategory } from "./types/category";
import { sizesArray } from "../enums/cart";
import { colorsArray } from "../enums/category";

export const CategorySchema = new mongoose.Schema<ICategory, mongoose.Model<ICategory>, ICategory>(
    {
        title: {
            type: String,
            required: true,
            maxLength: 100,
            minlength: 3
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
        image: {
            type: String
        },
        colors: {
            type: [{ type: String, enum: colorsArray }],
            required: true
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { collection: "Categories" }
);

export default mongoose.model("Category", CategorySchema);
export type CategorySchemaType = typeof CategorySchema;
