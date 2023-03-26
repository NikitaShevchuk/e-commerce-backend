import { body } from "express-validator";

const errorsMessages = {
    password: "Password can only contain letters and numbers and must be of length from 8 to 24.",
    email: "Please enter a valid email address."
};

export const signupValidators = [
    body("password", errorsMessages.password).isLength({ min: 8, max: 24 }).isAlphanumeric(),
    body("email", errorsMessages.email).isEmail()
];
