import { handleInviteUser } from "../controllers/invite.controller.js";
import express from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";

export const inviteRouter = express.Router();


inviteRouter.route("/").post(verifyJWT,handleInviteUser);