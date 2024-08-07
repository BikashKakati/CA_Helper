import { tokenName } from "../config/index.js";
import { cookieOptions } from "../constant/index.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/index.js";
import bcrypt from "bcryptjs";

// registration
export async function handleUserRegistration(req, res) {
    try {
        const { firstName, lastName, phone, email, password, role } = req.body;
        if (!firstName || !lastName || !phone || !email || !password || !role) {
            return res.customResponse(400, "fields are missing");
        }
        const userData = await User.findOne({ email });
        if (userData) {
            return res.customResponse(403, "account already exist, please log in");
        }
        const user = await User.create({
            firstName,
            lastName,
            phone,
            email,
            password,
            role: [role],
        })
        const token = generateToken(user._id);
        user.password = undefined;
        res
            .cookie(tokenName, token, cookieOptions)
            .customResponse(201, "registration completed successfully", user);
    } catch (err) {
        res.customResponse(500, "internal server error");
    }

}


// login
export async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.customResponse(400, "email or password not valid!");
        }

        const userData = await User.findOne({ email }).select("+password");
        if (!userData) {
            return res.customResponse(404, "account doesnot exist");
        }

        const isPasswordValid = await bcrypt.compare(password,userData.password);
        if(!isPasswordValid){
            return res.customResponse(400, "password not match");
        }
        
        const token = await generateToken(userData._id);
        userData.password = undefined;
        res.cookie(tokenName, token, cookieOptions).customResponse(200, "log in completed successfully", userData);

    } catch (err) {
        res.customResponse(500, "internal server error");
    }
}

// logout
export async function handleUserLogout(req, res){
    
    // todo: verify jwt token middleware...
    res.cookie(tokenName,"",{...cookieOptions,maxAge:0}).customResponse(200,"logout completed successfully")
}

export async function handleGetUserData(req,res){
    const userId = req.userId;

    const userData = await User.findById(userId);
    if(!userData){
        return res.customResponse(401,"invalid access token");
    }
    return res.customResponse(200,"user data is here",userData);
}