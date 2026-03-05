const Character = require("../models/character.model");

const getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.find();
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({
            error: error.message, // <--- Devuelve el error real al cliente
        });
    }
};

module.exports = { getAllCharacters };
