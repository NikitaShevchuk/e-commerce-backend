import { ProductSchema, type IProduct } from "./Product";
import { type Model, Types, Schema, model } from "mongoose";

export interface IOrder extends Document {
    products: Array<{
        product: IProduct | null;
        quantity: number;
    }>;
    user: typeof Types.ObjectId;
}

export interface IOrderMethods extends IOrder {}

interface OrderModel extends Model<IOrder, unknown, IOrderMethods> {}

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
        }
    },
    { collection: "Orders" }
);

// create new methods for Order Schema

export default model<IOrder, OrderModel>("Order", OrderSchema);
export type OrderSchemaType = typeof OrderSchema;
