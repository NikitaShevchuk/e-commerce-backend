import type { RequestHandler } from "express";
import OrderService from "./order.service";

class OrderController {
    get: RequestHandler = async (request, response, next) => {
        try {
            const orders = await OrderService.get();
            response.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    };

    create: RequestHandler = async (request, response, next) => {
        try {
            const createdOrder = await OrderService.create();
            if (createdOrder !== null) response.status(201).json(createdOrder);
            else response.status(422).json({ message: "One of the product's id is not valid!" });
        } catch (error) {
            next(error);
        }
    };

    removeOne: RequestHandler = async (request, response, next) => {
        try {
            const orderId = request.params.orderId;
            if (typeof orderId !== "string" || orderId.length < 1) {
                response
                    .status(422)
                    .json({ message: "Order id is required for delete operation!" });
                return;
            }
            const deletedOrder = await OrderService.removeOne(orderId);
            if (deletedOrder !== null) response.status(200).json(deletedOrder);
            else response.status(422).json({ message: "Order id is not valid!" });
        } catch (error) {
            next(error);
        }
    };
}

export default new OrderController();
