import { type IOrder } from "../models/Order";
import OrderRepository from "./order.repository";

class OrderService {
    async get(): Promise<IOrder[]> {
        return await OrderRepository.get();
    }

    async create(): Promise<IOrder | null> {
        return await OrderRepository.create();
    }

    async removeOne(orderId: string): Promise<IOrder | null> {
        return await OrderRepository.removeOne(orderId);
    }
}

export default new OrderService();
