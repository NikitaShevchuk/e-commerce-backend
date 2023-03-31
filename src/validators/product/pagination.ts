import { type ValidationChain, query } from "express-validator";

export const paginationParamsValidator: ValidationChain[] = [
    query("page").optional().isLength({ min: 1 }).isNumeric(),
    query("limit").optional().isLength({ min: 1 }).isNumeric()
];
