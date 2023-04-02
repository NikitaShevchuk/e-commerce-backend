import type { DefaultResponse } from "./../Types/Response";
import type { ErrorRequestHandler } from "express";

export const imageUploadErrorHandler: ErrorRequestHandler = (
    error,
    request,
    response,
    next
): void => {
    if (typeof error?.imageError === "string") {
        const result: DefaultResponse<undefined> = {
            success: false,
            message: error?.imageError
        };
        response.status(422).json(result);
    } else if (error?.name === "MulterError") {
        const result: DefaultResponse<undefined> = {
            success: false,
            message: `${String(error?.message)}: ${String(error?.field)}`
        };
        response.status(422).json(result);
    } else {
        next(error);
    }
};
