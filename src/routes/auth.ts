import express from "express";
import AuthController from "../auth/auth.controller";
import { signupValidators } from "../validators/auth/signup";
import { loginValidators } from "../validators/auth/login";
import { validationErrorHandler } from "../middleware/validator";

const authRoute = express.Router();

authRoute.get("/me", AuthController.me);
authRoute.post("/login", loginValidators, validationErrorHandler, AuthController.login);
authRoute.post("/signup", signupValidators, validationErrorHandler, AuthController.signup);
authRoute.post("/reset", AuthController.resetPassword);
authRoute.get("/reset/:token", AuthController.validateResetToken);
authRoute.post("/new-password", AuthController.createNewPassword);
authRoute.delete("/logout", AuthController.logout);

export default authRoute;
