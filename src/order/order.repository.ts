import { type NewOrderRequestData, getProductsFromDatabase } from "./utils/getProductsFromDatabase";
import { Types } from "mongoose";
import { userId } from "../cart/cart.repository";
import Order, { type IOrder } from "../models/Order";

class OrderRepository {
    async get(): Promise<IOrder[]> {
        return await Order.find();
    }

    async create(products: NewOrderRequestData[]): Promise<IOrder | null> {
        const { productsFromDatabase, allProductsAreValid } = await getProductsFromDatabase(
            products
        );
        if (!allProductsAreValid) return null;
        const newOrder = new Order({
            products: productsFromDatabase,
            user: new Types.ObjectId(userId)
        });
        await newOrder.save();
        return await newOrder.populate("user");
    }
}

export default new OrderRepository();
