import type { ProductType } from "../models/Product";
import AdminProductRepository from "./admin-product.repository";

class AdminProductsService {
    async create() {}

    async getAll(): Promise<ProductType[]> {
        return await AdminProductRepository.getAll();
    }

    async getById() {}

    async update() {}
}

export default new AdminProductsService();
