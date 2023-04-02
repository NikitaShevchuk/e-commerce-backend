import type { Pagination } from "../../Types/Pagination";
import Product from "../../models/Product";
import type { IProduct } from "../../models/types/product";
import { getSkipAmount } from "../../utils/pagination";

class ShopRepository {
    async getAll(
        page: string,
        limit: string,
        categoryId?: string,
        title?: string
    ): Promise<Pagination<IProduct[] | null>> {
        const query: any = {};
        if (typeof categoryId === "string") query.category = categoryId;
        if (typeof title === "string") query.title = { $regex: new RegExp(`${title}`, "i") };

        const products = await Product.find(query)
            .skip(getSkipAmount(page, limit))
            .limit(Number(limit))
            .populate("category", ["title"]);
        const total = await Product.count();

        return { data: products, total };
    }

    async getById(id: string): Promise<IProduct | null> {
        return await Product.findById(id);
    }
}

export default new ShopRepository();
