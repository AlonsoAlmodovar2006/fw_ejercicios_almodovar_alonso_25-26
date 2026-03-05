const router = require('express').Router();

// Delegamos en places.js
router.use('/characters', require('./api/character'));

// Exportamos el router para poder usarlo en otros archivos
module.exports = router;
