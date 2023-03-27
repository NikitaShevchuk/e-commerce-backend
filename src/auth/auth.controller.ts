import type { Response, Request } from "express";
import AuthService from "./auth.service";

class AuthController {
    async signup(request: Request, response: Response): Promise<void> {
        const result = await AuthService.signup(request.body);
        response.status(result.success ? 200 : 422).json(result);
    }

    async login(request: Request, response: Response): Promise<void> {
        const result = await AuthService.login(request, response);
        response.status(result.success ? 200 : 401).json(result);
    }

    async me(request: Request, response: Response): Promise<void> {
        const result = await AuthService.me(request, response);
        response.status(result.success ? 200 : 401).json(result);
    }

    async logout(request: Request, response: Response): Promise<void> {
        const result = await AuthService.logout(request.session);
        response.status(result.success ? 200 : 422).json(result);
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
