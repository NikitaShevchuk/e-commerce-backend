import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { createValidationErrorResponse } from "../validators/validation-error";

export const validationErrorHandler = (
    request: Request,
    response: Response,
    next: NextFunction
): void => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(422).json(createValidationErrorResponse(errors));
        return;
    }
    next();
};
