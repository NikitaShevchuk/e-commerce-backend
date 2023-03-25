import type { Response, Request } from "express";
import AdminProductService from "./admin-product.service";

class AdminProductsController {
    async create(request: Request, response: Response): Promise<void> {
        const userId = request.session?.user?._id;
        const newProduct = request.body;
        const product = await AdminProductService.create(newProduct, userId);
        response.status(201).json(product);
    }

    async getAll(request: Request, response: Response): Promise<void> {
        const userId = request.session?.user?._id;
        const product = await AdminProductService.getAll(userId);
        response.status(200).json(product);
    }

    async getById(request: Request, response: Response): Promise<void> {
        const product = await AdminProductService.getById(request.params.id);
        response.status(200).json(product);
    }

    async update(request: Request, response: Response): Promise<void> {
        const product = await AdminProductService.update(request.params.id, request.body);
        response.status(200).json(product);
    }

    async delete(request: Request, response: Response): Promise<void> {
        if (typeof request.params?.id === "string") {
            const product = await AdminProductService.delete(request.params.id);
            response.status(200).json(product);
        }
    }
}

export default new AdminProductsController();
