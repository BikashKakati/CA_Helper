import nodemailer from "nodemailer";
import { hostEmail, hostName, hostPassword, portNumber } from "../config/index.js";

export const cookieOptions = {
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
}

export const transporter = nodemailer.createTransport({
    service: "gmail",
    host: hostName,
    port: portNumber,
    secure: true,
    auth: {
        user: hostEmail,
        pass: hostPassword,
    }
})

export const clientEmailNote = "We are thrilled to welcome you to Accounting Guru, where you'll receive expert accounting support under the guidance of our Chartered Accountant. Our platform is designed to make your financial management seamless and effective.";

export const subAdminNote = "We're excited to have you on board at Accounting Guru. As a key part of our team, you'll be instrumental in managing clients and ensuring smooth financial operations. Together, we'll provide top-notch accounting services to our users.";