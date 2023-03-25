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

    async getByName(name: string): Promise<IProduct | null> {
        return await AdminProductRepository.getByName(name);
    }

    async getById(id: string): Promise<IProduct | null> {
        return await AdminProductRepository.getById(id);
    }

    async update(id: string, updatedProduct: IProduct): Promise<IProduct | null> {
        return await AdminProductRepository.update(id, updatedProduct);
    }

    async delete(id: string): Promise<IProduct | null> {
        return await AdminProductRepository.delete(id);
    }
}

export default new AdminProductsService();
