import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "guest"],
        default: "user"
    }
})

const userModel = mongoose.model("users", userSchema);

export default userModel;