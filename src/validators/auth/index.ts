import { type ValidationChain, body } from "express-validator";
import AuthRepository from "../../auth/auth.repository";

export const errorsMessages = {
    password: "Password can only contain letters and numbers, and must be of length from 8 to 24.",
    email: "Please enter a valid email address.",
    name: "Name field must contain only letters and numbers, and must by of length from 3 to 100.",
    confirmPassword: "Password mismatch"
};

export const validators = {
    password(): ValidationChain {
        return body("password", errorsMessages.password)
            .trim()
            .isLength({ min: 8, max: 24 })
            .isAlphanumeric();
    },
    email(): ValidationChain {
        return body("email", errorsMessages.email)
            .isEmail()
            .custom(async (email) => {
                const user = await AuthRepository.checkIfUserExistsByEmail(email);
                if (user) throw new Error("User with this email already exists");
            })
            .normalizeEmail();
    }
};
