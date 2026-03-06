const User = require("../models/user.model");

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        // Error por índice único duplicado
        if (error.code === 11000) {
            return res.status(400).json({
                error: "El email ya está registrado",
            });
        }
        res.status(500).json({ error: error.message });
    }
};

// Recuperar usuarios con el carrito "relleno" 
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").populate("cart");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { createUser, getUsers };
