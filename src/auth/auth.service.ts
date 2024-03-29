import type { Request, Response } from "express";
import { type DefaultResponse } from "../Types/Response";
import { generateToken } from "../security/csrf";
import type { IUser, SignupData, LoginData } from "../models/types/user";
import AuthRepository from "./auth.repository";
import crypto from "crypto";
import User from "../models/User";
import Mail from "../mail/index";

class AuthService {
    async signup(signupData: SignupData): Promise<DefaultResponse<IUser | null>> {
        return await AuthRepository.signup(signupData);
    }

    async login(request: Request, response: Response): Promise<DefaultResponse<IUser | null>> {
        const loginData = request.body as LoginData;
        const loginResult = await AuthRepository.login(loginData);

        if (loginResult.success && request.session !== undefined) {
            request.session.isLoggedIn = true;
            request.session.user = loginResult.data;
            return { ...loginResult, token: generateToken(response, request) };
        }

        return loginResult;
    }

    async logout(session: Express.Session | undefined): Promise<DefaultResponse<undefined>> {
        const result: DefaultResponse<undefined> = await new Promise((resolve) => {
            session?.destroy((error) => {
                if (error !== undefined) {
                    resolve({ success: false, isAuthorized: true, message: error });
                } else {
                    resolve({ success: true, isAuthorized: false });
                }
            });
        });
        return result;
    }

    async resetPassword(email: string): Promise<DefaultResponse<undefined>> {
        const token = crypto.randomBytes(32).toString("hex");
        const result = await AuthRepository.resetPassword(email, token);
        if (result.success) void Mail.passwordReset(email, token);
        return result;
    }

    async validateResetToken(token: string): Promise<DefaultResponse<{ userId: string }>> {
        const userWithToken = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() }
        });

        if (userWithToken !== null) {
            return { success: true, data: { userId: String(userWithToken._id) } };
        } else return { success: false, message: "Token for password reset is invalid!" };
    }

    async createNewPassword(
        userId: string,
        resetToken: string,
        password: string
    ): Promise<DefaultResponse<undefined>> {
        return await AuthRepository.createNewPassword(userId, resetToken, password);
    }

    async me(
        request: Request,
        response: Response
    ): Promise<DefaultResponse<IUser | null | undefined>> {
        const userIsLoggedIn =
            request.session !== undefined &&
            request.session?.isLoggedIn === true &&
            request.session?.user !== undefined;

        if (userIsLoggedIn) {
            const user = await AuthRepository.me(request.session?.user?._id);
            return {
                success: user !== null,
                isAuthorized: user !== null,
                data: user,
                token: generateToken(response, request)
            };
        } else {
            return { success: false, isAuthorized: false };
        }
    }
}

export default new AuthService();
