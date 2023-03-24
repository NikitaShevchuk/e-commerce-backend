import { type DefaultResponse } from "../Types/Response";
import type { IUser, SignupData, LoginData } from "../models/types/user";
import AuthRepository from "./auth.repository";

class AuthService {
    async signup(signupData: SignupData): Promise<DefaultResponse<IUser | null>> {
        return await AuthRepository.signup(signupData);
    }

    async login(loginData: LoginData): Promise<DefaultResponse<IUser | null>> {
        return await AuthRepository.login(loginData);
    }

    // async me() {}

    // async logout() {}
}

export default new AuthService();
