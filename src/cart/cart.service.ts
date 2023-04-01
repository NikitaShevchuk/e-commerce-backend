import type { DefaultResponse } from "../Types/Response";
import type { NewCartItem } from "../models/methods/user";
import { type ICart } from "../models/types/user";
import { createErrorResult } from "../utils/result";
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
        const productId = newCartItem.productId;
        if (updatedCart === null)
            return createErrorResult(`Product with ID ${productId} doesn't exist`);
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
        const productId = cartItemToRemove.productId;
        if (updatedCart === null)
            return createErrorResult(`Cart item with id "${productId}" is not found!`);
        return {
            success: true,
            data: updatedCart
        };
    }

    async removeAll(userId: string): Promise<DefaultResponse<ICart | null | undefined>> {
        const updatedCart = await CartRepository.removeAll(userId);
        if (updatedCart === null)
            return createErrorResult(`Can't clear cart for user with ID: "${userId}"!`);
        return {
            success: true,
            data: updatedCart
        };
    }
}

export default new CartService();
