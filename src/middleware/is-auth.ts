import type { Response, Request, NextFunction } from "express";

export const checkAuthorization = (
    request: Request,
    response: Response,
    next: NextFunction
): void => {
    if (
        request.session === undefined ||
        request.session?.isLoggedIn !== true ||
        request.session.user === undefined
    ) {
        response.status(401).json({ message: "Authorization is required to perform this action!" });
    } else {
        next();
    }
};
