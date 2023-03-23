import { type ICart, type IUser } from "./../../models/User";
import { type HydratedDocument } from "mongoose";
import User from "../../models/User";
import { userId } from "../../cart/cart.repository";

interface ReturnType {
    products: ICart | null;
    user: HydratedDocument<IUser> | null;
}

export const getProductsFromDatabase = async (): Promise<ReturnType> => {
    const user = await User.findById(userId).populate("cart.items.product");

    const products = user?.cart != null ? user?.cart : null;

    return {
        products,
        user
    };
};
