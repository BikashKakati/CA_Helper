import express from "express"
import { handleUserLogin, handleUserLogout, handleUserRegistration } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.route("/register").post(handleUserRegistration);
authRouter.route("/login").post(handleUserLogin);
authRouter.route("/logout").post(handleUserLogout);
