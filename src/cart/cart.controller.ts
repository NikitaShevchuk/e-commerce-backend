import type { RequestHandler } from "express";
import CartService from "./cart.service";
import type { NewCartItem } from "../models/methods/user";
import type { Sizes } from "../models/types/product";

class CartController {
    get: RequestHandler = async (request, response, next) => {
        try {
            const result = await CartService.get(request.session?.user?._id);
            response.status(result.success ? 200 : 401).json(result);
        } catch (error) {
            next(error);
        }
    };

    addCartItem: RequestHandler = async (request, response, next) => {
        try {
            const result = await CartService.addCartItem(request.body, request.session?.user._id);
            response.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            next(error);
        }
    };

    removeOne: RequestHandler = async (request, response, next) => {
        const cartItemToRemove: NewCartItem = {
            productId: request.params.id,
            size: request.params.size as Sizes
        };
        try {
            const updatedCart = await CartService.removeOne(
                cartItemToRemove,
                request.session?.user._id
            );
            response.status(200).json(updatedCart);
        } catch (error) {
            next(error);
        }
    };

    removeAll: RequestHandler = async (request, response, next) => {
        try {
            const result = await CartService.removeAll(request.session?.user?._id);
            response.status(result.success ? 200 : 403).json(result);
        } catch (error) {
            next(error);
        }
    };
}

export default new CartController();
