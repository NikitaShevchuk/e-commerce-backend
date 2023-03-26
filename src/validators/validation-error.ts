import type { Result, ValidationError } from "express-validator";
import type { DefaultResponse } from "../Types/Response";

export const createValidationErrorResponse = (
    errors: Result<ValidationError>
): DefaultResponse<undefined> => ({
    success: false,
    validationErrors: errors.array(),
    message: "Validation error"
});
