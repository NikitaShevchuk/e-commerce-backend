import { type DefaultResponse } from "../Types/Response";
import type { IUser, SignupData, LoginData } from "../models/types/user";
import AuthRepository from "./auth.repository";

class AuthService {
    async signup(signupData: SignupData): Promise<DefaultResponse<IUser | null>> {
        return await AuthRepository.signup(signupData);
    }

    async login(
        loginData: LoginData,
        session: Express.Session | undefined
    ): Promise<DefaultResponse<IUser | null>> {
        const loginResult = await AuthRepository.login(loginData);

        if (loginResult.success && session !== undefined) session.isLoggedIn = true;

        return loginResult;
    }

    // async me() {}

    // async logout() {}
}

export default new AuthService();
