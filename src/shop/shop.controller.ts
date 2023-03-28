import Product from "../models/Product";
import type { RequestHandler } from "express";

class ShopController {
    getAll: RequestHandler = async (request, response, next) => {
        try {
            const products = await Product.find();
            response.status(200).json(products);
        } catch (error) {
            next(error);
        }
    };

    getById: RequestHandler = async (request, response, next) => {
        try {
            const products = await Product.find();
            const productExists = products !== null;
            response
                .status(productExists ? 200 : 404)
                .json({ success: productExists, data: products });
        } catch (error) {
            next(error);
        }
    };
}

export default new ShopController();
