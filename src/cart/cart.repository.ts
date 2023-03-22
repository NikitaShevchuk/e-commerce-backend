import Product from "../models/Product";
import User, { type ICart } from "../models/User";

class CartRepository {
    async get(): Promise<ICart | null> {
        const user = await User.findById("641a2224e121b838322a6489");
        if (user != null) return user.cart;
        else return user;
    }

    async addCartItem(newCartProductId: string): Promise<ICart | null> {
        const user = await User.findById("641a2224e121b838322a6489");
        const existingProduct = await Product.findById(newCartProductId);
        if (existingProduct === null || user === null) return null;
        return user.addToCart(newCartProductId);
    }
}

export default new CartRepository();
