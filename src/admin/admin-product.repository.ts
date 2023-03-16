import type { ProductType } from "../models/Product";
import Product from "../models/Product";

class AdminProductsRepository {
    async create() {}

    async getAll(): Promise<ProductType[]> {
        return await Product.find();
    }

    async getById() {}

    async update() {}
}

export default new AdminProductsRepository();
