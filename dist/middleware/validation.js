"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInputErrors = void 0;
const express_validator_1 = require("express-validator");
const handleInputErrors = (req, res, next) => {
    // manejar Errores
    let errors = (0, express_validator_1.validationResult)(req);
    const mensajesDeError = errors.array().map(error => error.msg).join(". ");
    if (!errors.isEmpty()) {
        res.status(400).json({ mensaje: mensajesDeError });
        return;
    }
    next();
};
exports.handleInputErrors = handleInputErrors;
//# sourceMappingURL=validation.js.map