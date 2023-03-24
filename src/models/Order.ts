import { ProductSchema } from "./Product";
import { Types, Schema, model } from "mongoose";
import { type IOrder, type OrderModel, type IOrderMethods, OrderStatus } from "./types/order";

export const OrderSchema = new Schema<IOrder, OrderModel, IOrderMethods>(
    {
        products: [
            {
                type: { product: ProductSchema, quantity: Number },
                required: true
            }
        ],
        user: {
            type: Types.ObjectId,
            required: true,
            ref: "User"
        },
        status: {
            type: String,
            required: true,
            enum: [OrderStatus.uncompleted, OrderStatus.processing, OrderStatus.completed]
        }
    },
    { collection: "Orders" }
);

// create new methods for Order Schema

export default model<IOrder, OrderModel>("Order", OrderSchema);
export type OrderSchemaType = typeof OrderSchema;
