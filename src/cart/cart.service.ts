import { type ICart } from "../models/User";
import CartRepository from "./cart.repository";

class CartService {
    async get(): Promise<ICart | null> {
        return await CartRepository.get();
    }

    async addCartItem(newCartProductId: string): Promise<ICart | null> {
        return await CartRepository.addCartItem(newCartProductId);
    }

    async removeOne(productId: string): Promise<ICart | null> {
        return await CartRepository.removeOne(productId);
    }
}

export default new CartService();
