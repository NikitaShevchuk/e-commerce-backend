import { UserRoles } from "./../models/types/user";
import type { DefaultResponse } from "../Types/Response";
import User from "../models/User";
import type { LoginData, SignupData, IUser } from "../models/types/user";
import bcrypt from "bcryptjs";
import { createSuccessAuthResult, loginErrorResult, passwordResetErrorResult } from "./results";
import Mail from "../mail";

class AuthRepository {
    async signup(signupData: SignupData): Promise<DefaultResponse<IUser | null>> {
        const { email, name, password } = signupData;
        const cryptoPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email,
            name,
            password: cryptoPassword,
            cart: { items: [] },
            role: UserRoles.client
        });
        await user.save();
        void Mail.registration(user.email);
        return createSuccessAuthResult(user);
    }

    async login(loginData: LoginData): Promise<DefaultResponse<IUser | null>> {
        const { email, password } = loginData;
        const user = await User.findOne({ email });
        if (user === null || user?.password === undefined) return loginErrorResult;

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (passwordIsValid) return createSuccessAuthResult(user);

        return loginErrorResult;
    }

    async resetPassword(email: string, token: string): Promise<DefaultResponse<undefined>> {
        const user = await User.findOne({ email });

        if (user === null) {
            return { success: false, message: "User with this email is not registered!" };
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;

        await user.save();
        return {
            success: true,
            message: `A link to change your password has been sent to ${user.email}`
        };
    }

    async createNewPassword(
        userId: string,
        resetToken: string,
        password: string
    ): Promise<DefaultResponse<undefined>> {
        const user = await User.findOne({
            _id: userId,
            resetToken,
            resetTokenExpiration: { $gt: Date.now() }
        });

        if (user === null) return passwordResetErrorResult;

        const newPassword = await bcrypt.hash(password, 12);

        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        return {
            success: true,
            message: "New password saved successfully."
        };
    }

    async me(userId: string): Promise<IUser | null> {
        return await User.findById(userId).select(["-password"]);
    }

    async checkIfUserExistsByEmail(email: string): Promise<boolean> {
        const user = await User.findOne({ email });
        return user !== null;
    }
}

export default new AuthRepository();
