import { type IUserMethods, type ICart, type IUser } from "../../models/User";
import User from "../../models/User";
import { userId } from "../../cart/cart.repository";
import { type Types, type Document } from "mongoose";

interface ReturnType {
    products: ICart | null;
    user:
        | (Document<unknown, unknown, IUser> &
              Omit<
                  IUser & {
                      _id: Types.ObjectId;
                  },
                  keyof IUserMethods
              > &
              IUserMethods)
        | null;
}

export const getProductsAndUser = async (): Promise<ReturnType> => {
    const user = await User.findById(userId).populate("cart.items.product");
    const products = user?.cart != null ? user?.cart : null;
    return {
        products,
        user
    };
};
