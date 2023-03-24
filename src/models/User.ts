import {
    createAddToCartMethod,
    createClearCartMethod,
    createRemoveFromCartMethod
} from "./methods/user";
import { Types, Schema, model } from "mongoose";
import { type IUser, type UserModel, type IUserMethods, UserRoles } from "./types/user";

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
            enum: [UserRoles.admin, UserRoles.seller, UserRoles.client],
            required: true
        },
        password: {
            type: String,
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
