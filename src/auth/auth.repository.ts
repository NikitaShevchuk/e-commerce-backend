import { UserRoles } from "./../models/types/user";
import type { DefaultResponse } from "../Types/Response";
import User from "../models/User";
import type { LoginData, SignupData, IUser } from "../models/types/user";
import bcrypt from "bcryptjs";
import { createSuccessAuthResult, loginErrorResult, signupErrorResult } from "./results";

class AuthRepository {
    async signup(signupData: SignupData): Promise<DefaultResponse<IUser | null>> {
        const { email, name, password } = signupData;

        const userWithSameEmail = await User.findOne({ email });
        if (userWithSameEmail !== null) return signupErrorResult;

        const cryptoPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email,
            name,
            password: cryptoPassword,
            cart: { items: [] },
            role: UserRoles.client
        });
        await user.save();
        return createSuccessAuthResult(user);
    }

    async login(loginData: LoginData): Promise<DefaultResponse<IUser | null>> {
        const { email, password } = loginData;
        const user = await User.findOne({ email });

        if (user === null || user.password === undefined) return loginErrorResult;

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (passwordIsValid) return createSuccessAuthResult(user);

        return loginErrorResult;
    }

    // async me() {}

    // async logout() {}
}

export default new AuthRepository();
