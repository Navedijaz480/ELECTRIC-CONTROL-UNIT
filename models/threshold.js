const mongoose = require("mongoose");

const threshold = new mongoose.Schema({
    temperature_threshold: {
        type: mongoose.Types.Decimal128,
        default: 0.0,
        require: [true, "Temperature threshold is missing"]
    },
}, { timestamps: true });
module.exports = mongoose.model("Threshold", threshold);