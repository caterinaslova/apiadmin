"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateColorExists = exports.validateColorInputs = void 0;
const express_validator_1 = require("express-validator");
const color_modelo_1 = __importDefault(require("../models/color.modelo"));
const validateColorInputs = async (req, res, next) => {
    await (0, express_validator_1.body)('codigoColor').isString().withMessage('El codigo debe ser un string').notEmpty().withMessage('El código del color no puede estar vacío').isLength({ max: 15 }).withMessage('El código del color debe tener menos de 15 caracteres').run(req);
    await (0, express_validator_1.body)('nombreColor').isString().withMessage('El nombre debe ser un string').notEmpty().withMessage('El nombre del color no puede estar vacío').isLength({ max: 25 }).withMessage('El código del color debe tener menos de 25 caracteres').run(req);
    next();
};
exports.validateColorInputs = validateColorInputs;
const validateColorExists = async (req, res, next) => {
    const { id } = req.params;
    const color = await color_modelo_1.default.findById(id).select('-__v');
    if (!color) {
        const errorGenerado = new Error(`No existe el color con el id: ${id}`);
        res.status(404).json({ mensaje: errorGenerado.message });
        return;
    }
    req.color = color;
    next();
};
exports.validateColorExists = validateColorExists;
//# sourceMappingURL=color.inputvalidation.js.map