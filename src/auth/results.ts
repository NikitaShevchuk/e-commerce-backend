import type { DefaultResponse } from "./../Types/Response";
import type { IUser } from "../models/types/user";
import type { Result, ValidationError } from "express-validator";

export const loginErrorResult = {
    success: false,
    message: "Email or password is incorrect!"
};

export const signupErrorResult = {
    success: false,
    message: "User with same email already exists!"
};

export const createSuccessAuthResult = (user: IUser): DefaultResponse<IUser> => ({
    success: true,
    data: {
        name: user.name,
        email: user.email,
        cart: user.cart,
        role: user.role,
        _id: user._id
    }
});

export const createValidationErrorResponse = (
    errors: Result<ValidationError>
): DefaultResponse<undefined> => ({
    success: false,
    validationErrors: errors.array(),
    message: "Validation error"
});
