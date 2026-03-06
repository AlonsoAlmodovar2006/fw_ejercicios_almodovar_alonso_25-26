const Character = require("../models/character.model");
const Episodes = require("../models/episode.model");

const getAllEpisodes = async (req, res) => {
    try {
        const { season } = req.query;

        let episodes;
        let filtro = {}
        let total = await Episodes.countDocuments();

        if (season && !isNaN(season)) {
            filtro = { code: { $regex: `S${season.toString().padStart(2, '0')}` } };
        }

        //Si no hay limit, devolvemos todo
        episodes = await Episodes.find(filtro);

        res.status(200).json({
            data: episodes,
            total
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEpisodeById = async (req, res) => {
    try {
        const { id } = req.params;
        const episode = await Episodes.findById(id);
        if (!episode) {
            return res.status(404).json({ error: "Episodio no encontrado" });
        }
        res.status(200).json(episode);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createEpisode = async (req, res) => {
    try {
        let esValido = true;
        for (const characterId of req.body.characters) {
            const personaje = await Character.findById(characterId);
            if (!personaje) {
                esValido = false;
                break;
            }
        }
        if (!esValido) {
            return res.status(404).json({ error: "Personaje no encontrado" });
        }
        const episode = await Episodes.create(req.body);
        res.status(201).json(episode);
    } catch (error) {
        // Error por índice único duplicado
        if (error.code === 11000) {
            return res.status(400).json({
                error: "El episodio ya está registrado",
            });
        }
        res.status(500).json({ error: error.message });
    }
};

const deleteEpisode = async (req, res) => {
    try {
        const { id } = req.params;
        const episode = await Episodes.findByIdAndDelete(id);
        if (!episode) {
            return res.status(404).json({ error: "Episodio no encontrado" });
        }
        res.status(200).json({ message: "Episodio eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEpisode = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.body.characters) {
            let esValido = true;
            for (const characterId of req.body.characters) {
                const personaje = await Character.findById(characterId);
                if (!personaje) {
                    esValido = false;
                    break;
                }
            }
            if (!esValido) {
                return res.status(404).json({ error: "Personaje no encontrado" });
            }
        }
        const episode = await Episodes.findByIdAndUpdate(id, req.body, { new: true });
        if (!episode) {
            return res.status(404).json({ error: "Episodio no encontrado" });
        }
        res.status(200).json(episode);
    } catch (error) {
        // Error por índice único duplicado
        if (error.code === 11000) {
            return res.status(400).json({
                error: "El episodio ya está registrado",
            });
        }
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllEpisodes, getEpisodeById, createEpisode, deleteEpisode, updateEpisode };