import type { Response, Request } from "express";
import CartService from "./cart.service";

class CartController {
    async get(request: Request, response: Response): Promise<void> {
        if (request.session?.isLoggedIn === undefined || request.session?.isLoggedIn === false) {
            response.status(401).json({ message: "Unauthorized!" });
            return;
        }
        const cart = await CartService.get();
        response.status(200).json(cart);
    }

    async addCartItem(request: Request, response: Response): Promise<void> {
        if (request.session?.isLoggedIn === undefined || request.session?.isLoggedIn === false) {
            response.status(401).json({ message: "Unauthorized!" });
            return;
        }
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
    }

    async removeOne(request: Request, response: Response): Promise<void> {
        if (request.session?.isLoggedIn === undefined || request.session?.isLoggedIn === false) {
            response.status(401).json({ message: "Unauthorized!" });
            return;
        }
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
    }

    async removeAll(request: Request, response: Response): Promise<void> {
        if (request.session?.isLoggedIn === undefined || request.session?.isLoggedIn === false) {
            response.status(401).json({ message: "Unauthorized!" });
            return;
        }
        const { success } = await CartService.removeAll();
        if (success) response.status(200).json({ success });
        else response.status(422).json({ success, errorMessage: "Order id is not valid!" });
    }
}

export default new CartController();
