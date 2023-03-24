import type { LoginData, SignupData } from "./../models/types/user";
import type { Response, Request } from "express";
import AuthService from "./auth.service";

class AuthController {
    async signup(request: Request, response: Response): Promise<void> {
        const signupData = request.body as SignupData;
        const result = await AuthService.signup(signupData);
        if (result.success) response.status(201).json(result);
        else response.status(403).json(result);
    }

    async login(request: Request, response: Response): Promise<void> {
        const loginData = request.body as LoginData;
        const result = await AuthService.login(loginData, request.session);
        if (result.success) response.status(200).json(result);
        else response.status(403).json(result);
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
            if (error)
                response.status(500).json({ success: false, isAuthorized: true, message: error });
            else response.status(200).json({ success: true, isAuthorized: false });
        });
    }
}

export default new AuthController();
