import express from "express";
import AuthController from "../auth/auth.controller";

const authRoute = express.Router();

authRoute.get("/me", AuthController.me);
authRoute.post("/login", AuthController.login);
authRoute.post("/signup", AuthController.signup);
authRoute.post("/reset", AuthController.resetPassword);
authRoute.get("/reset/:token", AuthController.validateResetToken);
authRoute.post("/new-password", AuthController.createNewPassword);
authRoute.delete("/logout", AuthController.logout);

export default authRoute;
