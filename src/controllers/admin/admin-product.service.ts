import type { DefaultResponse } from "../../Types/Response";
import { createErrorResult } from "../../utils/result";
import type { IProduct } from "../../models/types/product";
import AdminProductRepository from "./admin-product.repository";

class AdminProductsService {
    async create(
        newProduct: IProduct,
        userId: string
    ): Promise<DefaultResponse<IProduct | undefined>> {
        newProduct.userId = userId;
        const product = await AdminProductRepository.create(newProduct);
        if (product === null) return createErrorResult("Product data is invalid!");
        return {
            success: true,
            data: product
        };
    }

    async getAll(userId: string): Promise<DefaultResponse<IProduct[] | undefined>> {
        const products = await AdminProductRepository.getAll(userId);
        if (products === null) return createErrorResult("Products not found!");
        return {
            success: true,
            data: products
        };
    }

    async getByTitle(
        title: string,
        userId: string
    ): Promise<DefaultResponse<IProduct | undefined>> {
        const product = await AdminProductRepository.getByTitle(title, userId);
        if (product === null)
            return createErrorResult(`Product with title ${title} does not exist`);
        return {
            success: true,
            data: product
        };
    }

    async getById(id: string, userId: string): Promise<DefaultResponse<IProduct | undefined>> {
        const product = await AdminProductRepository.getById(id, userId);
        if (product === null) return createErrorResult(`Product with ID ${id} does not exist!`);
        return {
            success: true,
            data: product
        };
    }

    async update(
        id: string,
        updatedProduct: IProduct,
        userId: string
    ): Promise<DefaultResponse<IProduct | undefined>> {
        const product = await AdminProductRepository.update(id, updatedProduct, userId);
        if (product === null) return createErrorResult("Product is not invalid!");
        return {
            success: true,
            data: product
        };
    }

    async delete(id: string, userId: string): Promise<DefaultResponse<IProduct | undefined>> {
        const product = await AdminProductRepository.delete(id, userId);
        if (product === null) return createErrorResult(`Product with ID ${id} doesn't exist!`);
        return {
            success: true,
            data: product
        };
    }
}

export default new AdminProductsService();
