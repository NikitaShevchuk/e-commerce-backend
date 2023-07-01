import type { DefaultResponse } from "../../Types/Response";
import type { IProduct } from "../../models/types/product";
import { createErrorResult } from "../../utils/result";
import { getResultWithPagination } from "../../utils/result-with-pagination";
import ShopRepository from "./shop.repository";

class ShopService {
    async getAll(
        page = "1",
        limit = "20",
        title?: string,
        categoryId?: string
    ): Promise<DefaultResponse<IProduct[] | undefined>> {
        const { data, total } = await ShopRepository.getAll(page, limit, categoryId, title);
        if (data === null) return createErrorResult("An error occurred while getting all products");
        return getResultWithPagination(data, total, page, limit);
    }

    async getById(id: string): Promise<DefaultResponse<IProduct | undefined>> {
        const product = await ShopRepository.getById(id);
        if (product === null) return createErrorResult("Product with this id doesn't exist");
        return { success: true, data: product };
    }
}

export default new ShopService();
