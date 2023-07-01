import mongoose from "mongoose";
import { UserSchema } from "../User";
import type { Sizes } from "../types/product";
import type { ICartItem } from "../types/user";

export interface NewCartItem {
    productId: string;
    size: Sizes;
}

class UserMethods {
    public createAll(): void {
        this.createAddToCart();
        this.createRemoveFromCart();
        this.createClearCart();
    }

    private createAddToCart(): void {
        UserSchema.methods.addToCart = async function (
            newCartItem: NewCartItem
        ): Promise<ICartItem> {
            let result: ICartItem;

            const cartProductIndex = this.cart.items.findIndex(
                (cartProduct) =>
                    String(cartProduct.product) === String(newCartItem.productId) &&
                    String(newCartItem.size) === String(cartProduct.selectedSize)
            );

            const updatedCartItems = [...this.cart.items];

            if (cartProductIndex >= 0) {
                const newQuantity = Number(this.cart.items[cartProductIndex].quantity) + 1;
                updatedCartItems[cartProductIndex].quantity = newQuantity;
                result = updatedCartItems[cartProductIndex];
            } else {
                const newCartProduct: ICartItem = {
                    product: new mongoose.Types.ObjectId(newCartItem.productId),
                    quantity: 1,
                    selectedSize: newCartItem.size
                };
                updatedCartItems.push(newCartProduct);
                result = newCartProduct;
            }

            this.cart = { items: updatedCartItems };
            await this.save();

            return result;
        };
    }

    private createRemoveFromCart(): void {
        UserSchema.methods.removeOne = async function (productId: string, size: Sizes) {
            this.cart.items = this.cart.items.filter(
                ({ product, selectedSize }) =>
                    String(product) !== productId && selectedSize !== size
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
