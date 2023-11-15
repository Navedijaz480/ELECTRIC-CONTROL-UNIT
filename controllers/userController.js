const User = require("../models/user");

// GET all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            res.json({ error: true, error_message: "User not found" });
        } else {
            res.json({ error: false, users: users });
        }
    } catch (error) {
        res.json({ error: true, error_message: error.message });
    }
};

// GET users by ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            res.json({ error: true, error_message: "User not found" });
        } else {
            res.json({ error: false, user: user });
        }
    } catch (error) {
        res.json({ error: true, error_message: error.message });
    }
};

// POST new user
const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({
            error: false,
            user: user,
            success_message: "Data submitted successfully",
        });
    } catch (error) {
        res.json({ error: true, error_message: error.message });
    }
};

// PUT update user by ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!user) {
            res.json({ error: true, message: "User not found" });
        } else {
            res.json({ error: false, user: user });
        }
    } catch (error) {
        res.json({ error: true, error_message: error.message });
    }
};

// DELETE user by ID
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.json({ error: true, error_message: "User not found" });
        } else {
            res.json({
                error: false,
                success_message: "User deleted successfully",
            });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};