const router = require("express").Router();

const charactersController = require("../../controllers/character.controller");
const { createCharacterRules, updateCharacterRules, validate } = require("../../validators/character.validator");


router.get("/", charactersController.getAllCharacters);
router.get("/:id", charactersController.getCharacterById);
router.post("/", createCharacterRules, validate, charactersController.createCharacter);
router.put("/:id", updateCharacterRules, validate, charactersController.updateCharacter);
router.delete("/:id", charactersController.deleteCharacter);

module.exports = router;
