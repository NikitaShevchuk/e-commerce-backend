import type { Request, Response } from "express";
import { type DefaultResponse } from "../Types/Response";
import { generateToken } from "../csrf";
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
            return { ...loginResult, token: generateToken(response, request) };
        }

        return loginResult;
    }

    async resetPassword(email: string): Promise<DefaultResponse<undefined>> {
        const token = crypto.randomBytes(32).toString("hex");
        const user = await User.findOne({ email });

        if (user === null) {
            return { success: false, message: "User with this email is not registered!" };
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;

        await user.save();
        void Mail.passwordReset(user.email, token);
        return {
            success: true,
            message: `A link to change your password has been sent to ${user.email}`
        };
    }
}

export default new AuthService();
