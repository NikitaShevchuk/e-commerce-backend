import { type ValidationChain, body, param } from "express-validator";
import { sizesArray } from "../../enums/cart";

export const cartBodyValidator: ValidationChain[] = [
    body("productId", "Product id is invalid!").trim().isString().isLength({ min: 24, max: 24 }),
    body("size").trim().toUpperCase().isIn(sizesArray)
];
export const cartSizeParamsValidator: ValidationChain = param("size")
    .trim()
    .toUpperCase()
    .isIn(sizesArray);
