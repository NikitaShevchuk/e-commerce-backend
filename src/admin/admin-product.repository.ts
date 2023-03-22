import type { IProduct } from "../models/Product";
import Product from "../models/Product";
import User from "../models/User";

class AdminProductsRepository {
    async create(newProduct: IProduct): Promise<IProduct> {
        const product = new Product(newProduct);
        await product.save();
        return product;
    }

    async getAll(): Promise<IProduct[]> {
        return await Product.find().populate("userId", ["name", "email", "role"], User);
    }

    async getByName(name: string): Promise<IProduct | null> {
        return await Product.findOne({
            name: { $regex: `/${name}/i` }
        });
    }

    async getById(id: string): Promise<IProduct | null> {
        return await Product.findById(id);
    }

    async update(id: string, updatedProduct: IProduct): Promise<IProduct | null> {
        return await Product.findOneAndUpdate({ _id: id }, updatedProduct);
    }

    async delete(id: string): Promise<IProduct | null> {
        return await Product.findByIdAndDelete(id);
    }
}

export default new AdminProductsRepository();
