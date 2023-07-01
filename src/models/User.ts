import UserMethods from "./methods/user";
import { Types, Schema, model } from "mongoose";
import { type IUser, type UserModel, type IUserMethods, UserRoles } from "./types/user";
import { sizesArray } from "../enums/cart";

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
            minlength: 3,
            trim: true
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
                    },
                    selectedSize: {
                        type: String,
                        required: true,
                        enum: sizesArray
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
            required: true,
            trim: true,
            minlength: 8,
            maxLength: 256
        },
        resetToken: String,
        resetTokenExpiration: Date
    },
    { collection: "Users" }
);

UserMethods.createAll();

export default model<IUser, UserModel>("User", UserSchema);
export type UserSchemaType = typeof UserSchema;
