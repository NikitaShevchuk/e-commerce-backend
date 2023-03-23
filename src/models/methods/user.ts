import mongoose from "mongoose";
import { UserSchema } from "../User";

export const createAddToCartMethod = (): void => {
    UserSchema.methods.addToCart = async function (newCartItemId: string) {
        const cartProductIndex = this.cart.items.findIndex((cartProduct) => {
            return String(cartProduct.product) === String(newCartItemId);
        });

        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            const newQuantity = Number(this.cart.items[cartProductIndex].quantity) + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            const newCartItem = {
                product: new mongoose.Types.ObjectId(newCartItemId),
                quantity: 1
            };
            updatedCartItems.push(newCartItem);
        }

        this.cart = { items: updatedCartItems };
        await this.save();
    };
};

export const createRemoveFromCartMethod = (): void => {
    UserSchema.methods.removeOne = async function (productId: string) {
        this.cart.items = this.cart.items.filter(({ product }) => String(product) !== productId);
        await this.save();
    };
};

export const createClearCartMethod = (): void => {
    UserSchema.methods.clearCart = async function () {
        this.cart = { items: [] };
        await this.save();
    };
};
