import type { DefaultResponse } from "./../Types/Response";
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, request, response, next): void => {
    console.log(`!!!!!!! SERVER ERROR: ${JSON.stringify(error)} !!!!!!!`);
    const result: DefaultResponse<undefined> = {
        success: false,
        message: "Server error"
    };
    response.status(500).json(result);
};
