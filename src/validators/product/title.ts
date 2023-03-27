import { type ValidationChain, query } from "express-validator";

export const titleQueryValidator: ValidationChain = query("title", "Title parameter is required!")
    .isString()
    .isLength({ min: 2, max: 100 });
