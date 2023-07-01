import Category from "../../models/Category";
import User from "../../models/User";
import type { ICategory } from "../../models/types/category";

class CategoryRepository {
    async getAll(): Promise<ICategory[] | null> {
        return await Category.find();
    }

    async findByTitle(title: string): Promise<ICategory | null> {
        return await Category.findOne({ title });
    }

    async getById(id: string): Promise<ICategory | null> {
        return await Category.findById(id);
    }

    async create(newCategory: ICategory, userId: string): Promise<ICategory | null> {
        const user = await User.findById(userId);
        if (user === null) return user;
        newCategory.userId = userId;
        const createdCategory = new Category(newCategory);
        await createdCategory.save();
        return createdCategory;
    }
}

export default new CategoryRepository();
