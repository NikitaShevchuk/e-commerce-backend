import type express from "express";

class AdminProductsController {
    async create(request: express.Request, response: express.Response) {}

    async getAll(request: express.Request, response: express.Response) {}

    async getById(request: express.Request, response: express.Response) {}

    async update(request: express.Request, response: express.Response) {}
}

export default new AdminProductsController();
