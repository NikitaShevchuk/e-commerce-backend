import type { DefaultResponse } from "../../Types/Response";
import type { ICategory } from "../../models/types/category";
import { createErrorResult } from "../../utils/result";
import CategoryRepository from "./category.repository";

class CategoryService {
    async getAll(title?: string): Promise<DefaultResponse<ICategory[] | ICategory | undefined>> {
        const titleExists = typeof title === "string";
        const categories = titleExists
            ? await CategoryRepository.findByTitle(this.normalizeTitle(title))
            : await CategoryRepository.getAll();
        if (categories === null) return createErrorResult("Category not found");
        return {
            success: true,
            data: categories
        };
    }

    async getById(id: string): Promise<DefaultResponse<ICategory | undefined>> {
        const category = await CategoryRepository.getById(id);
        if (category === null) return createErrorResult(`Category with ID ${id} doesn't exist`);
        return { success: true, data: category };
    }

    async create(
        newCategory: ICategory,
        userId: string
    ): Promise<DefaultResponse<ICategory | undefined>> {
        const createdCategory = await CategoryRepository.create(newCategory, userId);
        if (createdCategory === null) return createErrorResult("Category data is not valid!");
        return { success: true, data: createdCategory };
    }

    private normalizeTitle(title: string): string {
        const splittedTitle = title.toLowerCase().split("");
        splittedTitle[0] = splittedTitle[0].toUpperCase();
        return splittedTitle.join("");
    }
}

export default new CategoryService();
