import Product from "../models/Product";
import User from "../models/User";
import { type ICartItem, type ICart } from "../models/types/user";
import type { NewCartItem } from "../models/methods/user";

class CartRepository {
    async get(userId: string): Promise<ICart | null> {
        const user = await User.findById(userId).populate("cart.items.product");
        if (user != null) return user.cart;
        else return { items: [] };
    }

    async addCartItem(newCartItem: NewCartItem, userId: string): Promise<ICartItem | null> {
        const user = await User.findById(userId);
        const existingProduct = await Product.findById(newCartItem.productId);
        if (existingProduct === null || user === null) return null;

        const addedCartItem = await user.addToCart(newCartItem);
        return addedCartItem;
    }

    async removeOne(cartItemToRemove: NewCartItem, userId: string): Promise<ICart | null> {
        const user = await User.findById(userId);
        if (user === null) return user;

        await user.removeOne(cartItemToRemove.productId, cartItemToRemove.size);
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
