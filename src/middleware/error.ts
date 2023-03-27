import type { DefaultResponse } from "./../Types/Response";
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, request, response): void => {
    const result: DefaultResponse<undefined> = {
        success: false,
        message: JSON.stringify(error)
    };
    response.status(500).json(result);
};
