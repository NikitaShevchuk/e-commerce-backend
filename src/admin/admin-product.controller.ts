import type express from "express";
import AdminProductService from "./admin-product.service";

class AdminProductsController {
    async create(request: express.Request, response: express.Response) {}

    async getAll(request: express.Request, response: express.Response) {
        const products = await AdminProductService.getAll();
        response.status(200).json(products);
    }

    async getById(request: express.Request, response: express.Response) {}

    async update(request: express.Request, response: express.Response) {}
}

export default new AdminProductsController();
