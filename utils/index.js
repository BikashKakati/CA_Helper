import ejs from "ejs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { tokenSecret } from "../config/index.js";
import { clientEmailNote, subAdminNote, transporter } from "../constant/index.js";

export async function generateToken(userId) {
    try {
        const userAccessToken = await jwt.sign({ id: userId }, tokenSecret);
        return userAccessToken;
    } catch (err) {
        console.log(err);
        throw new Error();
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export async function sendEmail({senderEmail, recieverEmail, subject, emailBodyData}){
    try{
        const templatePath = path.resolve(__dirname,'../views/emailTemplates/invite.ejs');
        const html = await ejs.renderFile(templatePath, {
            logoUrl:"#",
            inviteLink:emailBodyData.link,
            welcomeNote:emailBodyData.role === "client"? clientEmailNote: subAdminNote,
          });
        const mailOptions = {
            from: senderEmail,
            to: recieverEmail,
            subject,
            html,
        }
        const emailInfo = await transporter.sendMail(mailOptions);
       return emailInfo;
    }catch(err){
        throw new Error("error occured while sending mail");
    }
}