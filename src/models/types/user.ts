import { type Types, type Model } from "mongoose";
import type { NewCartItem } from "../methods/user";
import type { Sizes } from "./product";

export interface ICartItem {
    product: Types.ObjectId;
    quantity: number;
    selectedSize: string;
}

export interface ICart {
    items: ICartItem[];
}

export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    cart: ICart;
    role: UserRoles;
    password?: string;
    resetToken?: string;
    resetTokenExpiration?: number;
}

export interface IUserMethods extends IUser {
    addToCart: (newCartItem: NewCartItem) => Promise<ICartItem>;
    removeOne: (productId: string, size: Sizes) => Promise<void>;
    clearCart: () => Promise<void>;
}

export interface UserModel extends Model<IUser, unknown, IUserMethods> {}

export enum UserRoles {
    admin = "admin",
    seller = "seller",
    client = "client"
}

export interface LoginData {
    email: string;
    password: string;
}

export interface SignupData {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}
