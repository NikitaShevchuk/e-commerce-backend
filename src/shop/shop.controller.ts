import Product from "../models/Product";
import type { RequestHandler } from "express";
import ShopService from "./shop.service";

class ShopController {
    getAll: RequestHandler = async (request, response, next) => {
        try {
            const result = await ShopService.getAll(
                request.query.page as string,
                request.query.limit as string
            );
            response.status(result.success ? 200 : 500).json(result);
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
