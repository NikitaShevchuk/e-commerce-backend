import type { RequestHandler } from "express";
import CartService from "./cart.service";

class CartController {
    get: RequestHandler = async (request, response) => {
        const cart = await CartService.get();
        response.status(200).json(cart);
    };

    addCartItem: RequestHandler = async (request, response) => {
        const productId = request.params.productId;
        if (productId.length === 0) {
            response.status(404).json({ message: "Product id is required!" });
            return;
        }
        const updatedCart = await CartService.addCartItem(productId);
        if (updatedCart === null) {
            response.status(404).json({ message: `Product with id "${productId}" is not found!` });
            return;
        }
        response.status(200).json(updatedCart);
    };

    removeOne: RequestHandler = async (request, response) => {
        const productId = request.params.productId;
        if (productId.length === 0) {
            response.status(404).json({ message: "Product id is required!" });
            return;
        }
        const updatedCart = await CartService.removeOne(productId);
        if (updatedCart === null) {
            response.status(404).json({ message: `Product with id "${productId}" is not found!` });
            return;
        }
        response.status(200).json(updatedCart);
    };

    removeAll: RequestHandler = async (request, response) => {
        const { success } = await CartService.removeAll();
        if (success) response.status(200).json({ success });
        else response.status(422).json({ success, errorMessage: "Order id is not valid!" });
    };
}

export default new CartController();
