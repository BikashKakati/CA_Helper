import jwt from "jsonwebtoken"
import { tokenSecret } from "../config/index.js"

export function generateToken(userId){
    const userAccessToken = jwt.sign({id:userId},tokenSecret,{ expiresIn: '24h' });
    return userAccessToken;
}