import Product from "../models/Product";
import User from "../models/User";
import { type ICart } from "../models/types/user";

export const userId = "641e3ba02ac6c35176b35490";

class CartRepository {
    async get(userId: string): Promise<ICart | null> {
        const user = await User.findById(userId).populate("cart.items.product");
        if (user != null) return user.cart;
        else return { items: [] };
    }

    async addCartItem(newCartProductId: string, userId: string): Promise<ICart | null> {
        const user = await User.findById(userId);
        const existingProduct = await Product.findById(newCartProductId);

        if (existingProduct === null || user === null) return null;

        await user.addToCart(newCartProductId);
        const updatedUser = await User.findById(userId).populate("cart.items.product");

        if (updatedUser !== null) return updatedUser.cart;
        else return updatedUser;
    }

    async removeOne(productId: string, userId: string): Promise<ICart | null> {
        const user = await User.findById(userId);

        if (user === null) return null;

        await user.removeOne(productId);
        const updatedUser = await User.findById(userId).populate("cart.items.product");

        if (updatedUser !== null) return updatedUser.cart;
        else return updatedUser;
    }

    async removeAll(userId: string): Promise<ICart | null> {
        const user = await User.findById(userId);
        await user?.clearCart();

        const updatedUser = await User.findById(userId).populate("cart.items.product");

        if (updatedUser !== null) return updatedUser.cart;
        else return updatedUser;
    }
}

export default new CartRepository();
