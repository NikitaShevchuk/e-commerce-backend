import { type ValidationChain, query } from "express-validator";

export const titleQueryValidator: ValidationChain = query(
    "title",
    "Title query parameter is invalid!"
)
    .optional()
    .isString()
    .isLength({ min: 2, max: 100 });
