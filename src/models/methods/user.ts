import mongoose from "mongoose";
import { UserSchema } from "../User";

export const createAddToCartMethod = (): void => {
    UserSchema.methods.addToCart = function (newCartItemId: string) {
        const cartProductIndex = this.cart.items.findIndex((cartProduct) => {
            return String(cartProduct.productId) === String(newCartItemId);
        });

        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            const newQuantity = Number(this.cart.items[cartProductIndex].quantity) + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            const newCartItem = {
                productId: new mongoose.Types.ObjectId(newCartItemId),
                quantity: 1
            };
            updatedCartItems.push(newCartItem);
        }

        this.cart = { items: updatedCartItems };
        this.save();
        return this.cart;
    };
};
