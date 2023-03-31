import type { DefaultResponse } from "../Types/Response";
import type { NewCartItem } from "../models/methods/user";
import { type ICart } from "../models/types/user";
import CartRepository from "./cart.repository";

class CartService {
    async get(userId: string): Promise<DefaultResponse<ICart | null>> {
        const cart = await CartRepository.get(userId);
        return {
            success: cart !== null,
            data: cart
        };
    }

    async addCartItem(
        newCartItem: NewCartItem,
        userId: string
    ): Promise<DefaultResponse<ICart | undefined>> {
        const updatedCart = await CartRepository.addCartItem(newCartItem, userId);
        if (updatedCart === null) {
            return {
                success: false,
                message: `Product with ID ${String(newCartItem.productId)} doesn't exist`
            };
        }
        return {
            success: true,
            data: updatedCart
        };
    }

    async removeOne(
        cartItemToRemove: NewCartItem,
        userId: string
    ): Promise<DefaultResponse<ICart | undefined>> {
        const updatedCart = await CartRepository.removeOne(cartItemToRemove, userId);
        if (updatedCart === null) {
            return {
                success: false,
                message: `Product with id "${String(cartItemToRemove.productId)}" is not found!`
            };
        }
        return {
            success: true,
            data: updatedCart
        };
    }

    async removeAll(userId: string): Promise<DefaultResponse<ICart | null | undefined>> {
        const updatedCart = await CartRepository.removeAll(userId);
        if (updatedCart === null) {
            return {
                success: false,
                message: `Can't clear cart for user with ID: "${userId}"!`
            };
        }
        return {
            success: true,
            data: updatedCart
        };
    }
}

export default new CartService();
