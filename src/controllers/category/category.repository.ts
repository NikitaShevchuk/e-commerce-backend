import Product from "../../models/Product";
import type { IProduct } from "../../models/types/product";

class CategoryRepository {
    async getAll(): Promise<IProduct[] | null> {
        return await Product.find();
    }

    async findByTitle(title: string): Promise<IProduct | null> {
        const titleQuery = { title: { $regex: new RegExp(`${title}`, "i") } };
        return await Product.findOne(titleQuery);
    }

    async getById(id: string): Promise<IProduct | null> {
        return await Product.findById(id);
    }
}

export default new CategoryRepository();
