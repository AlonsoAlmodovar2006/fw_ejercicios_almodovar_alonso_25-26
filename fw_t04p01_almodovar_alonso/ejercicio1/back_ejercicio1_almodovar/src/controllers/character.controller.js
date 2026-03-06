const Character = require("../models/character.model");

const getAllCharacters = async (req, res) => {
    try {
        const { page, limit } = req.query;

        let characters;
        let total = await Character.countDocuments();

        if (limit) {
            const pageNumber = parseInt(page) || 1;
            const limitNumber = parseInt(limit);
            const skip = (pageNumber - 1) * limitNumber;

            characters = await Character.find()
                .skip(skip)
                .limit(limitNumber);

            return res.status(200).json({
                data: characters,
                pagination: {
                    total,
                    page: pageNumber,
                    limit: limitNumber,
                    totalPages: Math.ceil(total / limitNumber)
                }
            });
        }

        //Si no hay limit, devolvemos todo
        characters = await Character.find();

        res.status(200).json({
            data: characters,
            total
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCharacterById = async (req, res) => {
    try {
        const { id } = req.params;
        const character = await Character.findById(id);
        if (!character) {
            return res.status(404).json({ error: "Personaje no encontrado" });
        }
        res.status(200).json(character);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCharacter = async (req, res) => {
    try {
        const character = await Character.create(req.body);
        res.status(201).json(character);
    } catch (error) {
        // Error por índice único duplicado
        if (error.code === 11000) {
            return res.status(400).json({
                error: "El personaje ya está registrado",
            });
        }
        res.status(500).json({ error: error.message });
    }
};

const deleteCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const character = await Character.findByIdAndDelete(id);
        if (!character) {
            return res.status(404).json({ error: "Personaje no encontrado" });
        }
        res.status(200).json({ message: "Personaje eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const character = await Character.findByIdAndUpdate(id, req.body, { new: true });
        if (!character) {
            return res.status(404).json({ error: "Personaje no encontrado" });
        }   
        res.status(200).json(character);
    } catch (error) {
        // Error por índice único duplicado
        if (error.code === 11000) {
            return res.status(400).json({
                error: "El personaje ya está registrado",
            });
        }
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllCharacters, getCharacterById, createCharacter, deleteCharacter, updateCharacter };