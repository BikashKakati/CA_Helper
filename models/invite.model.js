import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, "email already exist"],
        require: [true, "user email required"],
    },
    role: {
        type: String,
        enum: {
            values: ["client", "subAdmin"],
            message: '{VALUE} is not a valid role for invite',
        },
        require: [true, "role is required"],
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "expired"],
        default: "pending",
    },
}, { timestamps: true })

export const Invite = mongoose.model("invitedUsers", inviteSchema);