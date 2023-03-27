import type { RequestHandler } from "express";
import CartService from "./cart.service";

class CartController {
    get: RequestHandler = async (request, response, next) => {
        try {
            const cart = await CartService.get();
            response.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    };

    addCartItem: RequestHandler = async (request, response, next) => {
        try {
            const productId = request.params.productId;
            if (productId.length === 0) {
                response.status(404).json({ message: "Product id is required!" });
                return;
            }
            const updatedCart = await CartService.addCartItem(productId);
            if (updatedCart === null) {
                response
                    .status(404)
                    .json({ message: `Product with id "${productId}" is not found!` });
                return;
            }
            response.status(200).json(updatedCart);
        } catch (error) {
            next(error);
        }
    };

    removeOne: RequestHandler = async (request, response, next) => {
        try {
            const productId = request.params.productId;
            if (productId.length === 0) {
                response.status(404).json({ message: "Product id is required!" });
                return;
            }
            const updatedCart = await CartService.removeOne(productId);
            if (updatedCart === null) {
                response
                    .status(404)
                    .json({ message: `Product with id "${productId}" is not found!` });
                return;
            }
            response.status(200).json(updatedCart);
        } catch (error) {
            next(error);
        }
    };

    removeAll: RequestHandler = async (request, response, next) => {
        try {
            const { success } = await CartService.removeAll();
            if (success) response.status(200).json({ success });
            else response.status(422).json({ success, errorMessage: "Order id is not valid!" });
        } catch (error) {
            next(error);
        }
    };
}

export default new CartController();
