import Product from "../models/Product";
import type { Request, Response } from "express";

class ShopController {
    async getAll(request: Request, response: Response): Promise<void> {
        const products = await Product.find();
        response.status(200).json(products);
    }

    async getById(request: Request, response: Response): Promise<void> {
        if (typeof request.query?.id === "string") {
            const product = await Product.findById(request.query?.id);
            response.status(200).json(product);
        } else {
            const products = await Product.find();
            response.status(200).json(products);
        }
    }
}

export default new ShopController();
