"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMongoId = void 0;
const express_validator_1 = require("express-validator");
const validationMongoId = async (req, res, next) => {
    await (0, express_validator_1.param)('id').isString().isLength({ min: 24, max: 24 }).isHexadecimal().withMessage('Id no válido').run(req);
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ mensaje: 'Id no válido' });
        return;
    }
    next();
};
exports.validationMongoId = validationMongoId;
//# sourceMappingURL=validationMongoId.js.map