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
    },
    phone:{
        type:String,
        require:[true,"phone no. required"],
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})


export const User = mongoose.model("users",userSchema)