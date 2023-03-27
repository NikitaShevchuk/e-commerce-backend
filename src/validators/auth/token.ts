import { param } from "express-validator";

export const tokenValidators = [param("token").isString().isLength({ min: 64, max: 64 })];
