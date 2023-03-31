import type { DefaultResponse } from "../Types/Response";
import type { IProduct } from "../models/types/product";
import ShopRepository from "./shop.repository";

class ShopService {
    async getAll(page = "1", limit = "20"): Promise<DefaultResponse<IProduct[] | null>> {
        const { products, total } = await ShopRepository.getAll(page, limit);
        if (products === null) {
            return {
                success: false,
                message: "An error occurred while getting all products"
            };
        }

        const nextPageNumber = Number(page) + 1;
        const hasNextPage = Number(limit) * Number(page) < total;
        return {
            success: true,
            data: products,
            pagination: { total, nextPageNumber, hasNextPage }
        };
    }
}

export default new ShopService();
