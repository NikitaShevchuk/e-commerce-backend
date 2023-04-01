import type { RequestHandler } from "express";
import CategoryService from "./category.service";

class CategoryController {
    getAll: RequestHandler = async (request, response, next) => {
        try {
            const result = await CategoryService.getAll(request.query.page as string);
            response.status(result.success ? 200 : 500).json(result);
        } catch (error) {
            next(error);
        }
    };

    getById: RequestHandler = async (request, response, next) => {
        try {
            const result = await CategoryService.getById(request.params.id);
            response.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            next(error);
        }
    };
}

export default new CategoryController();
