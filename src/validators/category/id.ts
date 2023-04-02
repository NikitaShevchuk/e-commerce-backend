import { query } from "express-validator";

export const categoryIdValidator = query("categoryId", "Category ID param is invalid")
    .optional()
    .isString()
    .isLength({ min: 24, max: 24 });
