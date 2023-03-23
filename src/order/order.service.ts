import { type NewOrderRequestData } from "./utils/getProductsFromDatabase";
import { type IOrder } from "../models/Order";
import OrderRepository from "./order.repository";

class OrderService {
    async get(): Promise<IOrder[]> {
        return await OrderRepository.get();
    }

    async create(products: NewOrderRequestData[]): Promise<IOrder | null> {
        return await OrderRepository.create(products);
    }
}

export default new OrderService();
