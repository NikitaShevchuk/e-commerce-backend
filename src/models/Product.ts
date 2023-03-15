import * as mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 100
        }
    },
    { collection: "Products" }
);

export default mongoose.model("ProductSchema", ProductSchema);
export type ProductSchemaType = typeof ProductSchema;
