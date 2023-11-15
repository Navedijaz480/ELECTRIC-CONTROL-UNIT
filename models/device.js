const mongoose = require("mongoose");

const device = new mongoose.Schema({
    device_name: {
        type: String,
        required: [true, "Device name is missing"],
    },
    mac_address: {
        type: String,
        required: [true, "MAC Address is missing"],
        unique: true
    },
    device_status: {
        type: String,
        enum: ["ON", "OFF"],
        default: "OFF",
    },
    last_check_in: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User ID is required."],
        ref: "User",
    },
}, { timestamps: true });
module.exports = mongoose.model("Device", device);