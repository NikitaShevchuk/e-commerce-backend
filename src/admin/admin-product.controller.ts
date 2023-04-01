import type { RequestHandler } from "express";
import AdminProductService from "./admin-product.service";

class AdminProductsController {
    create: RequestHandler = async (request, response, next) => {
        try {
            const result = await AdminProductService.create(
                request.body,
                request.session?.user?._id
            );
            response.status(result.success ? 201 : 422).json(result);
        } catch (error) {
            next(error);
        }
    };

    getAll: RequestHandler = async (request, response, next) => {
        try {
            const result = await AdminProductService.getAll(request.session?.user?._id);
            response.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            next(error);
        }
    };

    getById: RequestHandler = async (request, response, next) => {
        try {
            const result = await AdminProductService.getById(
                request.params.id,
                request.session?.user?._id
            );
            response.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            next(error);
        }
    };

    getByTitle: RequestHandler = async (request, response, next) => {
        try {
            const result = await AdminProductService.getByTitle(
                request.params.title,
                request.session?.user?._id
            );
            response.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            next(error);
        }
    };

    update: RequestHandler = async (request, response, next) => {
        try {
            const result = await AdminProductService.update(
                request.params.id,
                request.body,
                request.session?.user?._id
            );
            response.status(result.success ? 200 : 422).json(result);
        } catch (error) {
            next(error);
        }
    };

    delete: RequestHandler = async (request, response, next) => {
        try {
            const result = await AdminProductService.delete(
                request.params.id,
                request.session?.user?._id
            );
            response.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            next(error);
        }
    };
}

export default new AdminProductsController();
