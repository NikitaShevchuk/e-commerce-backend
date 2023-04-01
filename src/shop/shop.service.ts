import type { DefaultResponse } from "../Types/Response";
import type { IProduct } from "../models/types/product";
import { getResultWithPagination } from "../utils/result-with-pagination";
import ShopRepository from "./shop.repository";

class ShopService {
    async getAll(
        page = "1",
        limit = "20",
        title?: string
    ): Promise<DefaultResponse<IProduct[] | null>> {
        const titleExists = typeof title === "string";
        const { data, total } = titleExists
            ? await ShopRepository.findByTitle(title, page, limit)
            : await ShopRepository.getAll(page, limit);
        if (data === null) {
            return {
                success: false,
                message: "An error occurred while getting all products"
            };
        }
        return getResultWithPagination(data, total, page, limit);
    }

    async getById(id: string): Promise<DefaultResponse<IProduct | null>> {
        const product = await ShopRepository.getById(id);
        if (product === null) {
            return {
                success: false,
                message: "Product with this id doesn't exist"
            };
        }
        return { success: true, data: product };
    }
}

export default new ShopService();