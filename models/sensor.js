const mongoose = require("mongoose");

const sensor = new mongoose.Schema({
    humidity: {
        type: mongoose.Types.Decimal128,
        default: 0.0,
        require: [true, "Humidity is missing"]
    },
    temperature: {
        type: mongoose.Types.Decimal128,
        default: 0.0,
        require: [true, "Humidity is missing"]
    },
    device: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Device ID is required."],
        ref: "Device",
    },
}, { timestamps: true });
module.exports = mongoose.model("Sensor", sensor);