const { body, validationResult } = require('express-validator');

const createCharacterRules = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 80 }).withMessage('Nombre demasiado corto o largo'),

    body('img')
        .notEmpty().withMessage('La URL de la imagen es obligatoria')
        .isURL().withMessage('Debe ser una URL válida'),

    body('edad')
        .notEmpty().withMessage('La edad es obligatoria')
        .isInt({ min: 0, max: 120 }).withMessage('La edad debe ser un número entero válido'),

    body('equipo')
        .notEmpty().withMessage('El equipo es obligatorio'),

    body('tecnicas_hissatsu')
        .isArray().withMessage('Las técnicas deben ser un arreglo de strings'),
    body('tecnicas_hissatsu.*')
        .isString().withMessage('Cada técnica debe ser un texto')
        .notEmpty().withMessage('La técnica no puede estar vacía'),

    body('posicion')
        .notEmpty().withMessage('La posición es obligatoria')
        .isIn(['Delantero', 'Mediocentro', 'Defensa', 'Portero'])
        .withMessage('Posición no válida'),

    body('primeraAparicion')
        .notEmpty().withMessage('La primera aparición es obligatoria')
        .matches(/^S\d{2}E\d{2}$/)
        .withMessage('Formato de aparición inválido. Debe ser como "S01E01"')
];

const updateCharacterRules = [
    body('nombre')
        .optional()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 80 }).withMessage('Nombre demasiado corto o largo'),

    body('img')
        .optional()
        .notEmpty().withMessage('La URL de la imagen es obligatoria')
        .isURL().withMessage('Debe ser una URL válida'),

    body('edad')
        .optional()
        .notEmpty().withMessage('La edad es obligatoria')
        .isInt({ min: 0, max: 120 }).withMessage('La edad debe ser un número entero válido'),

    body('equipo')
        .optional()
        .notEmpty().withMessage('El equipo es obligatorio'),

    body('tecnicas_hissatsu')
        .optional()
        .isArray().withMessage('Las técnicas deben ser un arreglo de strings'),
    body('tecnicas_hissatsu.*')
        .optional()
        .isString().withMessage('Cada técnica debe ser un texto')
        .notEmpty().withMessage('La técnica no puede estar vacía'),

    body('posicion')
        .optional()
        .notEmpty().withMessage('La posición es obligatoria')
        .isIn(['Delantero', 'Mediocentro', 'Defensa', 'Portero'])
        .withMessage('Posición no válida'),

    body('primeraAparicion')
        .optional()
        .notEmpty().withMessage('La primera aparición es obligatoria')
        .matches(/^S\d{2}E\d{2}$/)
        .withMessage('Formato de aparición inválido. Debe ser como "S01E01"')
]

// Middleware que comprueba si hubo errores
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { createCharacterRules, validate, updateCharacterRules};
