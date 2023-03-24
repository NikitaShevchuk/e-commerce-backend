import { type LoginData } from "../models/types/user";

class AuthService {
    async login(loginData: LoginData) {}

    async me() {}

    async logout() {}
}

export default new AuthService();
