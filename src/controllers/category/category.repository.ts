import type { Pagination } from "../../Types/Pagination";
import Product from "../../models/Product";
import type { IProduct } from "../../models/types/product";
import { getSkipAmount } from "../../utils/pagination";

class ShopRepository {
    async getAll(page: string, limit: string): Promise<Pagination<IProduct[] | null>> {
        const products = await Product.find().skip(getSkipAmount(page, limit)).limit(Number(limit));
        const total = await Product.count();
        return { data: products, total };
    }

    async findByTitle(
        title: string,
        page: string,
        limit: string
    ): Promise<Pagination<IProduct[] | null>> {
        const titleQuery = { title: { $regex: new RegExp(`${title}`, "i") } };
        const products = await Product.find(titleQuery)
            .skip(getSkipAmount(page, limit))
            .limit(Number(limit));
        const total = await Product.find(titleQuery).count();
        return { data: products, total };
    }

    async getById(id: string): Promise<IProduct | null> {
        return await Product.findById(id);
    }
}

export default new ShopRepository();
