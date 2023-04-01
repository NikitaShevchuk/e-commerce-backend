import { type ValidationChain, query } from "express-validator";

export const paginationParamsValidators: ValidationChain[] = [
    query("page").optional().isLength({ min: 1 }).isNumeric(),
    query("limit").optional().isLength({ min: 1 }).isNumeric()
];
