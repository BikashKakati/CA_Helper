import "dotenv/config";
import { app } from "./app.js";
import { databseUri, serverPort } from "./config/index.js";
import { connectDB } from "./database.js";

connectDB(databseUri);

app.listen(serverPort,()=>{
    console.log(`server started at PORT:${serverPort}`);
})