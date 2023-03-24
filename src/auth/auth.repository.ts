import type { Result } from "../cart/cart.repository";
import type { LoginData, SignupData } from "../models/types/user";

class AuthRepository {
    async signup(signupData: SignupData);

    async login(loginData: LoginData): Promise<Result> {}

    async me() {}

    async logout() {}
}

export default new AuthRepository();
