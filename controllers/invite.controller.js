import { clientUrl } from "../config/index.js";
import { Invite } from "../models/invite.model.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/index.js";

export async function handleInviteUser(req, res) {
    try{
        const userId = req.userId;
    const { email, role } = req.body;

    const userData = await User.findById(userId);
    if (!userData) {
        return res.customResponse(401, "invalid access token");
    }
    if (!email || !role) {
        return res.customResponse(400, "fields are missing");
    }
    const userRole = userData.role[0];
    if (userRole === "client") {
        return res.customResponse(400, "You are not authorized to invite user");
    }

    if (userRole === "subAdmin" && role !== "client") {
        return res.customResponse(400, `You are not authorized to invite ${role}`);
    }

    const prevInviteDetails = await Invite.findOne({ email });
    const sendEmailOptions = {
        senderEmail:userData.email, 
        recieverEmail: email, 
        subject:"You're Invited to Join Accounting Guru",
        emailBodyData:{
            role,
            link:`${clientUrl}/register?id=${prevInviteDetails.id}`
        }
    }

    if (prevInviteDetails && prevInviteDetails.role === role) {
        const emailInfo = await sendEmail(sendEmailOptions);
        prevInviteDetails.createdAt = Date.now();
        await prevInviteDetails.save();
        return res.customResponse(201, "Invitation sent successfully", prevInviteDetails);
    }

    const emailInfo = await sendEmail(sendEmailOptions);
    const invitedUserData = await Invite.create({email,role});
    res.customResponse(201,"Invitation sent successfully", invitedUserData);
    }catch(err){
        res.customResponse(400,err.message);
    }

}