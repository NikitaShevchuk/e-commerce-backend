import type { RequestHandler } from "express";
import ShopService from "./category.service";

class ShopController {
    getAll: RequestHandler = async (request, response, next) => {
        try {
            const result = await ShopService.getAll(
                request.query.page as string,
                request.query.limit as string,
                request.query.title as string
            );
            response.status(result.success ? 200 : 500).json(result);
        } catch (error) {
            next(error);
        }
    };

    getById: RequestHandler = async (request, response, next) => {
        try {
            const result = await ShopService.getById(request.params.id);
            response.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            next(error);
        }
    };
}

export default new ShopController();
