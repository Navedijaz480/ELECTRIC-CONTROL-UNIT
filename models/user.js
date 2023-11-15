const mongoose = require("mongoose");

const user = new mongoose.Schema({
    user_name: {
        type: String,
        require: [true, "User name is missing"]
    },
    email: {
        type: String,
        require: [true, "Email is missing"]
    },
    password: {
        type: String,
        require: [true, "Password is missing"]
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
    },
}, { timestamps: true });
module.exports = mongoose.model("User", user);