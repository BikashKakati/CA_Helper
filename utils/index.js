import jwt from "jsonwebtoken"
import { tokenSecret } from "../config/index.js"

export async function generateToken(userId) {
    try {
        const userAccessToken = await jwt.sign({ id: userId }, tokenSecret);
        return userAccessToken;
    } catch (err) {
        console.log(err);
    }
}