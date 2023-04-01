import type { RequestHandler } from "express";
import CategoryService from "./category.service";

class CategoryController {
    getAll: RequestHandler = async (request, response, next) => {
        try {
            const result = await CategoryService.getAll(request.query.title as string);
            response.status(result.success ? 200 : 404).json(result);
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

    create: RequestHandler = async (request, response, next) => {
        try {
            const result = await CategoryService.create(request.body, request.session?.user._id);
            response.status(result.success ? 201 : 422).json(result);
        } catch (error) {
            next(error);
        }
    };
}

export default new CategoryController();
