import { userId } from "./../cart/cart.repository";
import { OrderStatus } from "./../models/Order";
import { getProductsAndUser } from "./utils/getProductsAndUser";
import Order, { type IOrder } from "../models/Order";
import User from "../models/User";

export interface Result {
    success: boolean;
}

class OrderRepository {
    async get(): Promise<IOrder[]> {
        return await Order.find();
    }

    async create(): Promise<IOrder | null> {
        const { products, user } = await getProductsAndUser();
        if (products === null || user === null) return null;
        const newOrder = new Order({
            products: products.items,
            user,
            status: OrderStatus.uncompleted
        });
        await newOrder.save();
        await user.clearCart();
        return newOrder;
    }

    async removeOne(orderId: string): Promise<IOrder | null> {
        return await Order.findByIdAndRemove(orderId);
    }

    async removeAll(): Promise<Result> {
        const user = await User.findById(userId);
        await user?.clearCart();

        if (user !== null) return { success: true };
        else return { success: false };
    }
}

export default new OrderRepository();
