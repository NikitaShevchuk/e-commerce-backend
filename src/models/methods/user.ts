import mongoose from "mongoose";
import { UserSchema } from "../User";

class UserMethods {
    public createAll(): void {
        this.createAddToCart();
        this.createRemoveFromCart();
        this.createClearCart();
    }

    private createAddToCart(): void {
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
    }

    private createRemoveFromCart(): void {
        UserSchema.methods.removeOne = async function (productId: string) {
            this.cart.items = this.cart.items.filter(
                ({ product }) => String(product) !== productId
            );
            await this.save();
        };
    }

    private createClearCart(): void {
        UserSchema.methods.clearCart = async function () {
            this.cart = { items: [] };
            await this.save();
        };
    }
}

export default new UserMethods();
