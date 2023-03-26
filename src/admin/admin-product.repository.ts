import type { IProduct } from "../models/types/product";
import Product from "../models/Product";
import User from "../models/User";

class AdminProductsRepository {
    async create(newProduct: IProduct): Promise<IProduct> {
        const product = new Product(newProduct);
        await product.save();
        return product;
    }

    async getAll(userId: string): Promise<IProduct[]> {
        return await Product.find({ userId }).populate("userId", ["name", "email", "role"], User);
    }

    async getByTitle(name: string, userId: string): Promise<IProduct | null> {
        return await Product.findOne({
            name: { $regex: `/${name}/i` },
            userId
        });
    }

    async getById(id: string, userId: string): Promise<IProduct | null> {
        return await Product.findOne({ _id: id, userId });
    }

    async update(id: string, updatedProduct: IProduct, userId: string): Promise<IProduct | null> {
        return await Product.findOneAndUpdate({ _id: id, userId }, updatedProduct);
    }

    async delete(id: string, userId: string): Promise<IProduct | null> {
        return await Product.findOneAndDelete({ _id: id, userId });
    }
}

export default new AdminProductsRepository();
