import { getProductsAndUser } from "./utils/getProductsAndUser";
import Order from "../models/Order";
import { type IOrder, OrderStatus } from "../models/types/order";

class OrderRepository {
    async get(userId: string): Promise<IOrder[]> {
        return await Order.find({ user: userId });
    }

    async create(userId: string): Promise<IOrder | null> {
        const { products, user } = await getProductsAndUser(userId);
        if (products === null || user === null) return null;
        if (products.items?.length < 1) return null;
        const newOrder = new Order({
            products: products.items,
            user,
            status: OrderStatus.uncompleted
        });
        await newOrder.save();
        await user.clearCart();
        return newOrder;
    }

    async removeOne(orderId: string, userId: string): Promise<IOrder | null> {
        return await Order.findOneAndRemove({ _id: orderId, user: userId });
    }

    async getById(orderId: string, userId: string): Promise<IOrder | null> {
        return await Order.findOne({ _id: orderId, userId });
    }
}

export default new OrderRepository();
