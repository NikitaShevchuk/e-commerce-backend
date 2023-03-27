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
            if (typeof request.query?.id === "string") {
                const product = await Product.findById(request.query?.id);
                response.status(200).json(product);
            } else {
                const products = await Product.find();
                response.status(200).json(products);
            }
        } catch (error) {
            next(error);
        }
    };
}

export default new ShopController();
