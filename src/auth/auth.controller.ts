import type { RequestHandler } from "express";
import AuthService from "./auth.service";

class AuthController {
    signup: RequestHandler = async (request, response, next) => {
        try {
            const result = await AuthService.signup(request.body);
            response.status(result.success ? 200 : 422).json(result);
        } catch (error) {
            next(error);
        }
    };

    login: RequestHandler = async (request, response, next) => {
        try {
            const result = await AuthService.login(request, response);
            response.status(result.success ? 200 : 401).json(result);
        } catch (error) {
            next(error);
        }
    };

    me: RequestHandler = async (request, response, next) => {
        try {
            const result = await AuthService.me(request, response);
            response.status(result.success ? 200 : 401).json(result);
        } catch (error) {
            next(error);
        }
    };

    logout: RequestHandler = async (request, response, next) => {
        try {
            const result = await AuthService.logout(request.session);
            response.status(result.success ? 200 : 422).json(result);
        } catch (error) {
            next(error);
        }
    };

    resetPassword: RequestHandler = async (request, response, next) => {
        try {
            const result = await AuthService.resetPassword(request.body.email);
            response.status(result.success ? 200 : 422).json(result);
        } catch (error) {
            next(error);
        }
    };

    validateResetToken: RequestHandler = async (request, response, next) => {
        try {
            const result = await AuthService.validateResetToken(request.params.token);
            response.status(result.success ? 200 : 401).json(result);
        } catch (error) {
            next(error);
        }
    };

    createNewPassword: RequestHandler = async (request, response, next) => {
        try {
            const { password, resetToken, userId } = request.body;
            const result = await AuthService.createNewPassword(userId, resetToken, password);

            response.status(result.success ? 200 : 422).json(result);
        } catch (error) {
            next(error);
        }
    };
}

export default new AuthController();
