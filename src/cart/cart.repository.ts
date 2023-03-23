import Product from "../models/Product";
import User, { type ICart } from "../models/User";

export const userId = "641a2224e121b838322a6489";

export interface Result {
    success: boolean;
    errorMessage?: string;
}

class CartRepository {
    async get(): Promise<ICart | null> {
        const user = await User.findById(userId).populate("cart.items.product");
        if (user != null) return user.cart;
        else return user;
    }

    async addCartItem(newCartProductId: string): Promise<ICart | null> {
        const user = await User.findById(userId);
        const existingProduct = await Product.findById(newCartProductId);

        if (existingProduct === null || user === null) return null;

        await user.addToCart(newCartProductId);
        const updatedUser = await User.findById(userId).populate("cart.items.product");

        if (updatedUser !== null) return updatedUser.cart;
        else return updatedUser;
    }

    async removeOne(productId: string): Promise<ICart | null> {
        const user = await User.findById(userId);

        if (user === null) return null;

        await user.removeOne(productId);
        const updatedUser = await User.findById(userId).populate("cart.items.product");

        if (updatedUser !== null) return updatedUser.cart;
        else return updatedUser;
    }

    async removeAll(): Promise<Result> {
        const user = await User.findById(userId);
        await user?.clearCart();

        if (user !== null) return { success: true };
        else return { success: false };
    }
}

export default new CartRepository();
