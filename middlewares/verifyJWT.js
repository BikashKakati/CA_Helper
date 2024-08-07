import { tokenName, tokenSecret } from "../config/index.js";
import jwt from "jsonwebtoken";


export async function verifyJWT(req, res, next){
   try{
    const token = req.cookies[tokenName];
    if(!token){
        return res.customResponse(401,"unauthorized request");
    }

    const decodedData = await jwt.verify(token,tokenSecret);
    // const userData = await User.findById(decodedData?.id).select("-password");
    // conosle.log(userData);

    if(!decodedData?.id){
        return res.customResponse(401,"invalid access token");
    }

    req.userId = decodedData.id;
    next();
   }catch(err){
    conosle.log("from jwt validation",err);
   }
}