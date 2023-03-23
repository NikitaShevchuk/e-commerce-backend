import type { Response, Request } from "express";
import OrderService from "./order.service";
import { type NewOrderRequestData } from "./utils/getProductsFromDatabase";

class OrderController {
    async get(request: Request, response: Response): Promise<void> {
        const orders = await OrderService.get();
        response.status(200).json(orders);
    }

    async create(request: Request, response: Response): Promise<void> {
        const products = request.body.products as NewOrderRequestData[];
        if (!Array.isArray(products) || products.length < 1) {
            response.status(422).json({ message: "Products list for order is required!" });
        }
        const createdOrder = await OrderService.create(products);
        if (createdOrder !== null) response.status(201).json(createdOrder);
        else response.status(422).json({ message: "One of the product's id is not valid!" });
    }

    async removeOne(request: Request, response: Response): Promise<void> {}
}

export default new OrderController();
