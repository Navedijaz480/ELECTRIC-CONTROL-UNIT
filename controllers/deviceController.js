const Device = require("../models/device");

// GET all devices
const getAllDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        if (devices.length === 0) {
            res.json({ error: true, error_message: "Device not found" });
        } else {
            res.json({ error: false, devices: devices });
        }
    } catch (error) {
        res.json({ error: true, error_message: error.message });
    }
};

// GET devices by ID
const getDeviceById = async (req, res) => {
    const { id } = req.params;
    try {
        const device = await Device.findById(id);
        if (!device) {
            res.json({ error: true, error_message: "Device not found" });
        } else {
            res.json({ error: false, device: device });
        }
    } catch (error) {
        res.json({ error: true, error_message: error.message });
    }
};

// POST new device
const createDevice = async (req, res) => {
    try {
        const device = new Device(req.body);
        await device.save();
        res.json({
            error: false,
            device: device,
            success_message: "Data submitted successfully",
        });
    } catch (error) {
        res.json({ error: true, error_message: error.message });
    }
};

// PUT update device by ID
const updateDevice = async (req, res) => {
    const { id } = req.params;
    try {
        const device = await Device.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!device) {
            res.json({ error: true, message: "Device not found" });
        } else {
            res.json({ error: false, device: device });
        }
    } catch (error) {
        res.json({ error: true, error_message: error.message });
    }
};

// PUT update device by ID
const updateDeviceStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body
    try {
        const device = await Device.updateOne({ _id: id }, {
            $set: {
                device_status: status
            }
        });
        res.json({ error: false, success_message: "Data Updated Successfully" });
    } catch (error) {
        res.json({ error: true, error_message: error.message });
    }
};

// DELETE device by ID
const deleteDevice = async (req, res) => {
    const { id } = req.params;
    try {
        const device = await Device.findByIdAndDelete(id);
        if (!device) {
            res.json({ error: true, error_message: "Device not found" });
        } else {
            res.json({
                error: false,
                success_message: "Device deleted successfully",
            });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
};

module.exports = {
    getAllDevices,
    getDeviceById,
    createDevice,
    updateDevice,
    deleteDevice,
    updateDeviceStatus
};