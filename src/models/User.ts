import {
    createAddToCartMethod,
    createClearCartMethod,
    createRemoveFromCartMethod
} from "./methods/user";
import { type Model, Types, Schema, model } from "mongoose";

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
}

export interface IUserMethods extends IUser {
    addToCart: (newCartItemId: string) => Promise<void>;
    removeOne: (productId: string) => Promise<void>;
    clearCart: () => Promise<void>;
}

export interface UserModel extends Model<IUser, unknown, IUserMethods> {}

export type UserRoles = "admin" | "seller" | "client";

export const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
        name: {
            type: String,
            required: true,
            maxLength: 100,
            minlength: 3
        },
        email: {
            type: String,
            required: true,
            maxLength: 100,
            minlength: 3
        },
        cart: {
            items: [
                {
                    product: {
                        type: Types.ObjectId,
                        ref: "Product",
                        required: true
                    },
                    quantity: {
                        type: Number,
                        required: true
                    }
                }
            ]
        },
        role: {
            type: String,
            enum: ["admin", "seller", "client"],
            required: true
        }
    },
    { collection: "Users" }
);

// create new methods for User Schema
createAddToCartMethod();
createRemoveFromCartMethod();
createClearCartMethod();

export default model<IUser, UserModel>("User", UserSchema);
export type UserSchemaType = typeof UserSchema;
