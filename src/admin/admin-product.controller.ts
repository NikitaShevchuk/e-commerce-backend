import type { RequestHandler } from "express";
import AdminProductService from "./admin-product.service";

class AdminProductsController {
    create: RequestHandler = async (request, response) => {
        const product = await AdminProductService.create(request.body, request.session?.user?._id);
        response.status(201).json(product);
    };

    getAll: RequestHandler = async (request, response) => {
        const product = await AdminProductService.getAll(request.session?.user?._id);
        response.status(200).json(product);
    };

    getById: RequestHandler = async (request, response) => {
        const product = await AdminProductService.getById(
            request.params.id,
            request.session?.user?._id
        );
        response.status(200).json(product);
    };

    getByTitle: RequestHandler = async (request, response) => {
        const product = await AdminProductService.getByTitle(
            request.params.title,
            request.session?.user?._id
        );
        response.status(200).json(product);
    };

    update: RequestHandler = async (request, response) => {
        const product = await AdminProductService.update(
            request.params.id,
            request.body,
            request.session?.user?._id
        );
        response.status(200).json(product);
    };

    delete: RequestHandler = async (request, response) => {
        if (typeof request.params?.id === "string") {
            const product = await AdminProductService.delete(
                request.params.id,
                request.session?.user?._id
            );
            response.status(200).json(product);
        }
    };
}

export default new AdminProductsController();
