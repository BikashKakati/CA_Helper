import express from "express"
import { handleUserRegistration } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.route("/register").post(handleUserRegistration);