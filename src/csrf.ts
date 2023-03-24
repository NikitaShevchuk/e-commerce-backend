import { doubleCsrf } from "csrf-csrf";
import type { NextFunction, Request, Response } from "express";
import { cookieSecret } from "./environment-variables";

export const { invalidCsrfTokenError, generateToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: (request?: Request) =>
        request !== undefined ? (request.secret !== undefined ? request.secret : "") : "",
    cookieName: cookieSecret,
    cookieOptions: { sameSite: false, secure: false, signed: true }, // TODO: not ideal for production, development only
    size: 64,
    ignoredMethods: ["GET", "HEAD", "OPTIONS"]
});

export const csrfErrorHandler = (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
): void => {
    if (error === invalidCsrfTokenError) {
        response.status(403).json({
            error: "csrf validation error"
        });
    } else {
        next();
    }
};
