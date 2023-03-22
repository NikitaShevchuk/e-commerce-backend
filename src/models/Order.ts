import { type IProduct } from "./Product";
import { type Model, Types, Schema, model } from "mongoose";

export interface IOrder {
    products: IProduct[];
    user: typeof Types.ObjectId;
}

export interface IOrderMethods extends IOrder {}

interface OrderModel extends Model<IOrder, unknown, IOrderMethods> {}

export const OrderSchema = new Schema<IOrder, OrderModel, IOrderMethods>(
    {
        products: [
            {
                type: {
                    _id: Number,
                    title: String,
                    price: Number,
                    description: String,
                    sizes: [String],
                    isFavorite: Boolean,
                    productIsNew: Boolean,
                    image: String,
                    color: String
                },
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
