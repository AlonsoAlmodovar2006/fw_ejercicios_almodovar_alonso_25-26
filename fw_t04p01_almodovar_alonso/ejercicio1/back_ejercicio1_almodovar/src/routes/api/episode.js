const router = require("express").Router();

const episodeController = require("../../controllers/episode.controller");
const { createEpisodeRules, validate, updateEpisodeRules } = require("../../validators/episode.validator");

router.get("/", episodeController.getAllEpisodes);
router.get("/:id", episodeController.getEpisodeById);
router.post("/", createEpisodeRules, validate, episodeController.createEpisode);
router.put("/:id", updateEpisodeRules, validate, episodeController.updateEpisode);
router.delete("/:id", episodeController.deleteEpisode);

module.exports = router;
