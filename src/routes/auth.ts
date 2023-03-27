import express from "express";
import AuthController from "../auth/auth.controller";
import { signupValidators } from "../validators/auth/signup";
import { loginValidators } from "../validators/auth/login";
import { validationErrorHandler } from "../middleware/validator";
import { tokenValidators } from "../validators/auth/token";
import { resetPasswordValidator } from "../validators/auth/reset-password";
import { newPasswordValidators } from "../validators/auth/new-password";

const authRoute = express.Router();

authRoute.get("/me", AuthController.me);
authRoute.post("/login", loginValidators, validationErrorHandler, AuthController.login);
authRoute.post("/signup", signupValidators, validationErrorHandler, AuthController.signup);
authRoute.post(
    "/reset",
    resetPasswordValidator,
    validationErrorHandler,
    AuthController.resetPassword
);
authRoute.get(
    "/reset/:token",
    tokenValidators,
    validationErrorHandler,
    AuthController.validateResetToken
);
authRoute.post(
    "/new-password",
    newPasswordValidators,
    validationErrorHandler,
    AuthController.createNewPassword
);
authRoute.delete("/logout", AuthController.logout);

export default authRoute;
