import express from "express"
import { handleGetUserData, handleUserLogin, handleUserLogout, handleUserRegistration } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

export const authRouter = express.Router();

authRouter.route("/register").post(handleUserRegistration);
authRouter.route("/login").post(handleUserLogin);
authRouter.route("/logout").post(verifyJWT,handleUserLogout);
authRouter.route("/userdata").get(verifyJWT,handleGetUserData);

