import type { RequestHandler } from "express";
import OrderService from "./order.service";

class OrderController {
    get: RequestHandler = async (request, response, next) => {
        try {
            const result = await OrderService.get(request.session?.user._id);
            response.status(result.success ? 200 : 403).json(result);
        } catch (error) {
            next(error);
        }
    };

    create: RequestHandler = async (request, response, next) => {
        try {
            const result = await OrderService.create(request.session?.user._id);
            response.status(result.success ? 201 : 422).json(result);
        } catch (error) {
            next(error);
        }
    };

    removeOne: RequestHandler = async (request, response, next) => {
        try {
            const result = await OrderService.removeOne(
                request.params.id,
                request.session?.user._id
            );
            response.status(result.success ? 200 : 422).json(result);
        } catch (error) {
            next(error);
        }
    };
}

export default new OrderController();
