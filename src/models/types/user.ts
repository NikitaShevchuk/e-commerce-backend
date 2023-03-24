import { type Types, type Model } from "mongoose";

export interface ICart {
    items: Array<{
        product: Types.ObjectId;
        quantity: number;
    }>;
}

export interface IUser {
    name: string;
    email: string;
    cart: ICart;
    role: UserRoles;
    password: string;
}

export interface IUserMethods extends IUser {
    addToCart: (newCartItemId: string) => Promise<void>;
    removeOne: (productId: string) => Promise<void>;
    clearCart: () => Promise<void>;
}

export interface UserModel extends Model<IUser, unknown, IUserMethods> {}

export type UserRoles = "admin" | "seller" | "client";

export interface LoginData {
    email: string;
    password: string;
}

export interface SignupData {
    email: string;
    password: string;
    name: string;
}
