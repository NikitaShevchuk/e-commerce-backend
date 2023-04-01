import type { DefaultResponse } from "../../Types/Response";
import type { IProduct } from "../../models/types/product";
import { createErrorResult } from "../../utils/result";
import CategoryRepository from "./category.repository";

class CategoryService {
    async getAll(title?: string): Promise<DefaultResponse<IProduct[] | IProduct | undefined>> {
        const titleExists = typeof title === "string";
        const categories = titleExists
            ? await CategoryRepository.findByTitle(title)
            : await CategoryRepository.getAll();
        if (categories === null)
            return createErrorResult("An error occurred while getting all categories");
        return {
            success: true,
            data: categories
        };
    }

    async getById(id: string): Promise<DefaultResponse<IProduct | undefined>> {
        const product = await CategoryRepository.getById(id);
        if (product === null) {
            return {
                success: false,
                message: `Category with ID ${id} doesn't exist`
            };
        }
        return { success: true, data: product };
    }
}

export default new CategoryService();
