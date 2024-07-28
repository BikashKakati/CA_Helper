import mongoose from "mongoose";

export async function connectDB(databseUri){
    try{
        const mongoInstance = await mongoose.connect(databseUri,{dbName:"backend_accounting"});
        console.log(`database connnected successfully at ${mongoInstance.connection.host}`);
    }catch(err){
        console.log("database connection failed",err.message);
    }
}