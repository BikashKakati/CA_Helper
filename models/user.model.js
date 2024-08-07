import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:[true,"user first name required"],
    },
    lastName:{
        type:String,
        require:[true,"user last name required"],
    },
    role:[{
        type:String,
        enum:["superAdmin","subAdmin","client"],
        require:[true,"user role required"],
    }],
    email:{
        type:String,
        unique:[true,"email already exist"],
        require:[true,"user email required"],
    },
    password:{
        type:String,
        require:[true,"password required"],
        select:false,
    },
    phone:{
        type:String,
        require:[true,"phone no. required"],
    }
},{timestamps:true})

userSchema.pre("save",function(next){
    if(!this.isModified("password")){
        return next();
    }
    bcrypt.hash(this.password,10,function(err,hashedPassword){
        if(err){
            console.log(err, "password hashing failed");
        }
        this.password = hashedPassword;
    });
    next();
})


export const User = mongoose.model("users",userSchema)