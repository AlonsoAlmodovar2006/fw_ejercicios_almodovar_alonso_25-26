const router = require('express').Router();
const { checkToken } = require("../middlewares/auth.middleware")

// Delegamos en places.js
router.use('/characters', checkToken, require('./api/character'));
router.use("/auth", require("./api/auth"));
router.use('/episodes', checkToken, require('./api/episode'));
// Exportamos el router para poder usarlo en otros archivos
module.exports = router;
