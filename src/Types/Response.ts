import type { ValidationError } from "express-validator";

export interface DefaultResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    token?: string;
    isAuthorized?: boolean;
    validationErrors?: ValidationError[];
}
