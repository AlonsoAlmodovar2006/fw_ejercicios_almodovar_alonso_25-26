const router = require("express").Router();

const charactersController = require("../../controllers/character.controller");

router.get("/", charactersController.getAllCharacters);

module.exports = router;
