import { getProductsFromDatabase } from "./utils/getProductsFromDatabase";
import Order, { type IOrder } from "../models/Order";

class OrderRepository {
    async get(): Promise<IOrder[]> {
        return await Order.find();
    }

    async create(): Promise<IOrder | null> {
        const { products, user } = await getProductsFromDatabase();
        if (products === null) return null;
        const newOrder = new Order({
            products: products.items,
            user,
            status: "uncompleted"
        });
        await newOrder.save();
        return newOrder;
    }

    async removeOne(orderId: string): Promise<IOrder | null> {
        return await Order.findByIdAndRemove(orderId);
    }
}

export default new OrderRepository();
