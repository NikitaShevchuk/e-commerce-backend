import type { SignupData } from "./../models/types/user";
import type { Response, Request } from "express";
import AuthService from "./auth.service";

class AuthController {
    async signup(request: Request, response: Response): Promise<void> {
        const signupData = request.body as SignupData;
        const result = await AuthService.signup(signupData);
        response.status(result.success ? 200 : 401).json(result);
    }

    async login(request: Request, response: Response): Promise<void> {
        const result = await AuthService.login(request, response);
        response.status(result.success ? 200 : 401).json(result);
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
            if (error) {
                response.status(500).json({ success: false, isAuthorized: true, message: error });
            } else {
                response.status(200).json({ success: true, isAuthorized: false });
            }
        });
    }

    async resetPassword(request: Request, response: Response): Promise<void> {
        const email = request.body?.email;
        const result = await AuthService.resetPassword(email);
        response.status(result.success ? 200 : 422).json(result);
    }

    async validateResetToken(request: Request, response: Response): Promise<void> {
        const token = request.params.token;
        const result = await AuthService.validateResetToken(token);

        response.status(result.success ? 200 : 401).json(result);
    }

    async createNewPassword(request: Request, response: Response): Promise<void> {
        const { password, resetToken, userId } = request.body;
        const result = await AuthService.createNewPassword(userId, resetToken, password);

        response.status(result.success ? 200 : 422).json(result);
    }
}

export default new AuthController();
