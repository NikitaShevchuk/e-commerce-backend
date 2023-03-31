import Product from "../models/Product";
import type { IProduct } from "../models/types/product";

class ShopRepository {
    async getAll(
        page: string,
        limit: string
    ): Promise<{ products: IProduct[] | null; total: number }> {
        const skip = (Number(page) - 1) * Number(limit);
        const products = await Product.find().skip(skip).limit(Number(limit));
        const total = await Product.count();
        return {
            products,
            total
        };
    }
}

export default new ShopRepository();
