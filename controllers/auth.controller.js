import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export async function handleUserRegistration(req, res){
    try{
        const {firstName, lastName, phone, email, password,role} = req.body;
    if(!firstName || !lastName || !phone || !email || !password || !role){
        return res.customResponse(400,"fields are missing");
    }
    const userData = await User.findOne({email});
    if(userData){
        return res.customResponse(403,"email already exist, please log in");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        firstName,
        lastName,
        phone,
        email,
        password:hashedPassword,
        role:[role],
    })
    user.password = undefined;
    res.customResponse(201,"registration completed successfully",user);
    }catch(err){
        res.customResponse(500,"internal server error");
    }

}