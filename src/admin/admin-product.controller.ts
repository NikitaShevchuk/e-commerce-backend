import type { RequestHandler } from "express";
import AdminProductService from "./admin-product.service";

class AdminProductsController {
    create: RequestHandler = async (request, response, next) => {
        try {
            const product = await AdminProductService.create(
                request.body,
                request.session?.user?._id
            );
            response.status(201).json(product);
        } catch (error) {
            next(error);
        }
    };

    getAll: RequestHandler = async (request, response, next) => {
        try {
            const product = await AdminProductService.getAll(request.session?.user?._id);
            response.status(200).json(product);
        } catch (error) {
            next(error);
        }
    };

    getById: RequestHandler = async (request, response, next) => {
        try {
            const product = await AdminProductService.getById(
                request.params.id,
                request.session?.user?._id
            );
            response.status(200).json(product);
        } catch (error) {
            next(error);
        }
    };

    getByTitle: RequestHandler = async (request, response, next) => {
        try {
            const product = await AdminProductService.getByTitle(
                request.params.title,
                request.session?.user?._id
            );
            response.status(200).json(product);
        } catch (error) {
            next(error);
        }
    };

    update: RequestHandler = async (request, response, next) => {
        try {
            const product = await AdminProductService.update(
                request.params.id,
                request.body,
                request.session?.user?._id
            );
            response.status(200).json(product);
        } catch (error) {
            next(error);
        }
    };

    delete: RequestHandler = async (request, response, next) => {
        try {
            if (typeof request.params?.id === "string") {
                const product = await AdminProductService.delete(
                    request.params.id,
                    request.session?.user?._id
                );
                response.status(200).json(product);
            } else {
                response
                    .status(422)
                    .json({ success: false, message: "Product id to delete no found" });
            }
        } catch (error) {
            next(error);
        }
    };
}

export default new AdminProductsController();
