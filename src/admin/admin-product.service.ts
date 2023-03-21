import type { IProduct } from "./../models/Product";
import AdminProductRepository from "./admin-product.repository";

class AdminProductsService {
    async create(newProduct: IProduct): Promise<IProduct> {
        return await AdminProductRepository.create(newProduct);
    }

    async getAll(): Promise<IProduct[]> {
        return await AdminProductRepository.getAll();
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
