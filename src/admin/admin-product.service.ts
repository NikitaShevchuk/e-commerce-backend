import type { IProduct } from "./../models/types/product";
import AdminProductRepository from "./admin-product.repository";

class AdminProductsService {
    async create(newProduct: IProduct, userId: string): Promise<IProduct> {
        newProduct.userId = userId;
        return await AdminProductRepository.create(newProduct);
    }

    async getAll(userId: string): Promise<IProduct[]> {
        return await AdminProductRepository.getAll(userId);
    }

    async getByTitle(name: string, userId: string): Promise<IProduct | null> {
        return await AdminProductRepository.getByTitle(name, userId);
    }

    async getById(id: string, userId: string): Promise<IProduct | null> {
        return await AdminProductRepository.getById(id, userId);
    }

    async update(id: string, updatedProduct: IProduct, userId: string): Promise<IProduct | null> {
        return await AdminProductRepository.update(id, updatedProduct, userId);
    }

    async delete(id: string, userId: string): Promise<IProduct | null> {
        return await AdminProductRepository.delete(id, userId);
    }
}

export default new AdminProductsService();
