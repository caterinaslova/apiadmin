"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategoriaExists = exports.validateCategoriasInputs = void 0;
const express_validator_1 = require("express-validator");
const categoria_modelo_1 = __importDefault(require("../models/categoria.modelo"));
const validateCategoriasInputs = async (req, res, next) => {
    await (0, express_validator_1.body)('nombreCategoria').isString().withMessage('El nombre de la categoria debe ser un string').notEmpty().withMessage('El nombre de la categoría no puede ir vacío').isLength({ min: 5, max: 40 }).withMessage('La categoría debe tener una extensión de mínimo 5 y máximo 40 caracteres').run(req);
    await (0, express_validator_1.body)('descripcionCategoria').isString().withMessage('La descripción de la categoria debe ser un string').notEmpty().withMessage('La descripción de la categoría no puede ir vacío').isLength({ min: 5, max: 40 }).withMessage('La descripción de la categoría debe tener una extensión de mínimo 5 y máximo 40 caracteres').run(req);
    await (0, express_validator_1.body)('tipoCategoria').isIn(['Mercadería Reventa', 'Ingreso Contable', 'Egreso Contable']).withMessage('La categoría de ser una de las 3 opciones propuestas.').notEmpty().withMessage('Debe elegir una opción de tipo de Categoría').run(req);
    await (0, express_validator_1.body)('ordenEnMenu').isNumeric().withMessage('El orden debe ser un numero').isInt({ min: 1 }).withMessage('El orden en Menú debe ser un número entero').run(req);
    await (0, express_validator_1.body)('validaActualmente').isIn(['on', 'off']).withMessage('El campo validaActualmente solo puede ser on o off').run(req);
    // await body('imagenCategoria').isString().withMessage('El campo imagen solo acepta un string con el nombre de la imagen').optional().run(req)
    await (0, express_validator_1.body)('carpetaFotos').isString().withMessage('El campo carpeta solo acepta un string con el nombre de la carpeta de la imagen').run(req);
    next();
};
exports.validateCategoriasInputs = validateCategoriasInputs;
const validateCategoriaExists = async (req, res, next) => {
    const { id } = req.params;
    const categoria = await categoria_modelo_1.default.findById(id).select('-__v');
    if (!categoria) {
        const errorGenerado = new Error(`No existe la categoria con el id: ${id}`);
        res.status(404).json({ mensaje: errorGenerado.message });
        return;
    }
    req.categoria = categoria;
    next();
};
exports.validateCategoriaExists = validateCategoriaExists;
//# sourceMappingURL=categoria.inputvalidation.js.map