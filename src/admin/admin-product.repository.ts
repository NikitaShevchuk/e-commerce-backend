import fs from "fs";
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
        if (updatedProduct.image === undefined) {
            const oldProduct = await Product.findOne({ _id: id, userId });
            if (oldProduct !== null) updatedProduct.image = oldProduct.image;
        } else {
            fs.unlink(updatedProduct.image, (error) => {
                console.log(error);
            });
        }
        await Product.findOneAndUpdate({ _id: id, userId }, updatedProduct);
        return await Product.findOne({ _id: id, userId });
    }

    async delete(id: string, userId: string): Promise<IProduct | null> {
        const productToDelete = await Product.findOne({ _id: id, userId });
        if (productToDelete !== null)
            fs.unlink(productToDelete.image, (error) => {
                console.log(error);
            });
        return await Product.findOneAndDelete({ _id: id, userId });
    }
}

export default new AdminProductsRepository();
