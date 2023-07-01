import type { DefaultResponse } from "../../Types/Response";
import { type IOrder } from "../../models/types/order";
import { createErrorResult } from "../../utils/result";
import OrderRepository from "./order.repository";

class OrderService {
    async get(userId: string): Promise<DefaultResponse<IOrder[] | undefined>> {
        const orders = await OrderRepository.get(userId);
        if (orders === null) return createErrorResult("Orders for this user are not available");
        return {
            success: true,
            data: orders
        };
    }

    async create(userId: string): Promise<DefaultResponse<IOrder | undefined>> {
        const newOrder = await OrderRepository.create(userId);
        if (newOrder === null)
            return createErrorResult("Can not create order since cart is empty.");
        return {
            success: true,
            data: newOrder
        };
    }

    async removeOne(orderId: string, userId: string): Promise<DefaultResponse<IOrder | undefined>> {
        const removedOrder = await OrderRepository.removeOne(orderId, userId);
        if (removedOrder === null) return createErrorResult("Order ID is not valid!");
        return {
            success: true,
            data: removedOrder
        };
    }
}

export default new OrderService();
