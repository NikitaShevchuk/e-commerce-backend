import express from "express";
import AuthController from "../auth/auth.controller";

const authRoute = express.Router();

authRoute.post("/login", AuthController.login);
authRoute.post("/signup", AuthController.signup);
authRoute.get("/me", AuthController.me);
authRoute.delete("/logout", AuthController.logout);

export default authRoute;
