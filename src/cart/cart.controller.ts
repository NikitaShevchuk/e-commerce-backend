import type { Response, Request } from "express";
import CartService from "./cart.service";

class CartController {
    async get(request: Request, response: Response): Promise<void> {
        const cart = await CartService.get();
        response.status(200).json(cart);
    }

    async addCartItem(request: Request, response: Response): Promise<void> {
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
}

export default new CartController();
