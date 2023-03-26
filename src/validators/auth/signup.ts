import { body } from "express-validator";
import { validators, errorsMessages } from ".";

export const signupValidators = [
    validators.password(),
    validators.email(),
    body("name", errorsMessages.name).isLength({ min: 3, max: 100 }).isAlphanumeric(),
    body("confirmPassword", errorsMessages.confirmPassword)
        .trim()
        .custom((confirmPasswordValue, { req }) => confirmPasswordValue === req.body.password)
];
