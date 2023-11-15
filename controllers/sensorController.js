const Sensor = require("../models/sensor");

// GET all sensors
const getAllSensors = async (req, res) => {
    try {
        const sensors = await Sensor.find().populate("device");
        if (sensors.length === 0) {
            res.json({ error: true, error_message: "Sensor not found" });
        } else {
            res.json({ error: false, sensors: sensors });
        }
    } catch (error) {
        res.json({ error: true, error_message: error.message });
    }
};

// GET sensors by ID
const getSensorById = async (req, res) => {
    const { id } = req.params;
    try {
        const sensor = await Sensor.findById(id).populate("device");
        if (!sensor) {
            res.json({ error: true, error_message: "Sensor not found" });
        } else {
            res.json({ error: false, sensor: sensor });
        }
    } catch (error) {
        res.json({ error: true, error_message: error.message });
    }
};

const getSensorByMacAddress = async (req, res) => {
    const { address } = req.params;
    try {
        const sensor = await Sensor.find().populate({ path: "device", match: { mac_address: address } });
        if (!sensor) {
            res.json({ error: true, error_message: "Sensor not found" });
        } else {
            res.json({ error: false, sensor: sensor });
        }
    } catch (error) {
        res.json({ error: true, error_message: error.message });
    }
};

// POST new sensor
const createSensor = async (req, res) => {
    try {
        const sensor = new Sensor(req.body);
        await sensor.save();
        res.json({
            error: false,
            sensor: sensor,
            success_message: "Data submitted successfully",
        });
    } catch (error) {
        res.json({ error: true, error_message: error.message });
    }
};

// PUT update sensor by ID
const updateSensor = async (req, res) => {
    const { id } = req.params;
    try {
        const sensor = await Sensor.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!sensor) {
            res.json({ error: true, message: "Sensor not found" });
        } else {
            res.json({ error: false, sensor: sensor });
        }
    } catch (error) {
        res.json({ error: true, error_message: error.message });
    }
};

// DELETE sensor by ID
const deleteSensor = async (req, res) => {
    const { id } = req.params;
    try {
        const sensor = await Sensor.findByIdAndDelete(id);
        if (!sensor) {
            res.json({ error: true, error_message: "Sensor not found" });
        } else {
            res.json({
                error: false,
                success_message: "Sensor deleted successfully",
            });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
};

module.exports = {
    getAllSensors,
    getSensorById,
    createSensor,
    updateSensor,
    deleteSensor,
    getSensorByMacAddress
};