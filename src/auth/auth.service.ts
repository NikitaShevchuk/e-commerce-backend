import type { Request, Response } from "express";
import { type DefaultResponse } from "../Types/Response";
import { generateToken } from "../csrf";
import type { IUser, SignupData, LoginData } from "../models/types/user";
import AuthRepository from "./auth.repository";

class AuthService {
    async signup(signupData: SignupData): Promise<DefaultResponse<IUser | null>> {
        return await AuthRepository.signup(signupData);
    }

    async login(request: Request, response: Response): Promise<DefaultResponse<IUser | null>> {
        const loginData = request.body as LoginData;
        const loginResult = await AuthRepository.login(loginData);

        if (loginResult.success && request.session !== undefined) request.session.isLoggedIn = true;

        return { ...loginResult, token: generateToken(response, request) };
    }

    // async me() {}

    // async logout() {}
}

export default new AuthService();
