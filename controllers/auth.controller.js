import { cookieOptions } from "../constant/index.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/index.js";

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
            .cookie("userToken", token, cookieOptions)
            .customResponse(201, "registration completed successfully", user);
    } catch (err) {
        res.customResponse(500, "internal server error");
    }

}


// login
// export async function handleLogin(req, res){
//     const {email, password} = req.body;
//     if(!email || !password){
//         return res.customResponse(400,)
//     }
// }