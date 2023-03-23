import type { Response, Request } from "express";
import OrderService from "./order.service";

class OrderController {
    async get(request: Request, response: Response): Promise<void> {
        const orders = await OrderService.get();
        response.status(200).json(orders);
    }

    async create(request: Request, response: Response): Promise<void> {
        const createdOrder = await OrderService.create();
        if (createdOrder !== null) response.status(201).json(createdOrder);
        else response.status(422).json({ message: "One of the product's id is not valid!" });
    }

    async removeOne(request: Request, response: Response): Promise<void> {
        const orderId = request.params.orderId;
        if (typeof orderId !== "string" || orderId.length < 1) {
            response.status(422).json({ message: "Order id is required for delete operation!" });
            return;
        }
        const deletedOrder = await OrderService.removeOne(orderId);
        if (deletedOrder !== null) response.status(200).json(deletedOrder);
        else response.status(422).json({ message: "Order id is not valid!" });
    }
}

export default new OrderController();
