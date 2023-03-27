import { body } from "express-validator";
import { validators } from ".";

export const newPasswordValidators = [
    body("resetToken", "Reset token is invalid!").isString().isLength({ min: 64, max: 64 }),
    body("userId", "User id is invalid!").isString().isLength({ min: 24, max: 24 }),
    validators.password()
];
