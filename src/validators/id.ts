import { type ValidationChain, param } from "express-validator";

export const idParamValidator: ValidationChain = param("id", "Id parameter is required!")
    .isString()
    .isLength({ min: 24, max: 24 });
