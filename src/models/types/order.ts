import type { Types, Model } from "mongoose";
import type { IProduct } from "./product";

export enum OrderStatus {
    uncompleted = "uncompleted",
    processing = "processing",
    completed = "completed"
}

export interface IOrder extends Document {
    products: Array<{
        product: IProduct | null;
        quantity: number;
    }>;
    user: typeof Types.ObjectId;
    status: OrderStatus;
}

export interface IOrderMethods extends IOrder {}

export interface OrderModel extends Model<IOrder, unknown, IOrderMethods> {}
