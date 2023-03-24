import type { Response, Request } from "express";
import { userId } from "../cart/cart.repository";
import User from "../models/User";

class AuthController {
    async login(request: Request, response: Response): Promise<void> {
        const user = await User.findById(userId);
        if (request.session !== undefined) {
            request.session.isLoggedIn = true;
            request.session.user = user;
        }
        response.status(200).json({ success: true });
    }

    async me(request: Request, response: Response): Promise<void> {
        if (request.session !== undefined && request.session?.isLoggedIn === true) {
            response.status(200).json({ success: true, isAuthorized: true });
        } else {
            response.status(401).json({ success: true, isAuthorized: false });
        }
    }

    async logout(request: Request, response: Response): Promise<void> {
        request.session?.destroy((error) => {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (error) response.status(500).json({ success: false, message: error });
            else response.status(200).json({ success: true });
        });
    }
}

export default new AuthController();
