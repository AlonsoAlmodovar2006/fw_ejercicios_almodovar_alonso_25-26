const { body, validationResult } = require('express-validator');
const createEpisodeRules = [
    body('code')
        .notEmpty().withMessage('El código es obligatorio')
        .matches(/^S\d{2}E\d{2}$/)
        .withMessage('El código debe tener el formato S01E01'),

    body('title')
        .notEmpty().withMessage('El título es obligatorio')
        .isLength({ min: 3, max: 500 }).withMessage('Título entre 3 y 500 caracteres'),

    body('summary')
        .notEmpty().withMessage('El resumen es obligatorio')
        .isLength({ min: 10 }).withMessage('El resumen es demasiado corto'),

    body('year')
        .notEmpty().withMessage('El año es obligatorio')
        .isInt({ min: 1950, max: new Date().getFullYear() })
        .withMessage('Año no válido'),

    body('characters')
        .isArray().withMessage('Characters debe ser un arreglo'),

    body('characters.*')
        .isMongoId().withMessage('Cada personaje debe ser un ID de MongoDB válido')
];

const updateEpisodeRules = [
    body('code')
        .optional()
        .notEmpty().withMessage('El código es obligatorio')
        .matches(/^S\d{2}E\d{2}$/)
        .withMessage('El código debe tener el formato S00E00'),

    body('title')
        .optional()
        .notEmpty().withMessage('El título es obligatorio')
        .isLength({ min: 3, max: 500 }).withMessage('Título entre 3 y 500 caracteres'),

    body('summary')
        .optional()
        .notEmpty().withMessage('El resumen es obligatorio')
        .isLength({ min: 10 }).withMessage('El resumen es demasiado corto'),

    body('year')
        .optional()
        .notEmpty().withMessage('El año es obligatorio')
        .isInt({ min: 1950, max: new Date().getFullYear() })
        .withMessage('Año no válido'),

    body('characters')
        .optional()
        .isArray().withMessage('Characters debe ser un arreglo'),

    body('characters.*')
        .optional()
        .isMongoId().withMessage('Cada personaje debe ser un ID de MongoDB válido')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { createEpisodeRules, validate, updateEpisodeRules };