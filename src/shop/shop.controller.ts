import Product from "../models/Product";
import type { RequestHandler } from "express";

class ShopController {
    getAll: RequestHandler = async (request, response) => {
        const products = await Product.find();
        response.status(200).json(products);
    };

    getById: RequestHandler = async (request, response) => {
        if (typeof request.query?.id === "string") {
            const product = await Product.findById(request.query?.id);
            response.status(200).json(product);
        } else {
            const products = await Product.find();
            response.status(200).json(products);
        }
    };
}

export default new ShopController();
