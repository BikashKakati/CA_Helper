import express from "express"
import cors from "cors";
import { clientPort } from "./config/index.js";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.routes.js";
import { customResponse } from "./middlewares/customResponse.middleware.js";
export const app = express();


app.use(cors({origin:clientPort}));
app.use(express.json()); //parse into javascript format from json
app.use(express.urlencoded({extended:true})); // parse url encoded format(form data) to normal format.
app.use(cookieParser());

// custom response middleware
app.use(customResponse);
// routes
app.use("/api/v1/user",authRouter);


