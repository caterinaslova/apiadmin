"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const colores_controller_1 = require("../controllers/colores.controller");
const validation_1 = require("../middleware/validation");
const color_inputvalidation_1 = require("../inputsValidation/color.inputvalidation");
const validationMongoId_1 = require("../inputsValidation/validationMongoId");
const router = (0, express_1.Router)();
router.param('id', validationMongoId_1.validationMongoId);
router.param('id', color_inputvalidation_1.validateColorExists);
router.route('/')
    .post(color_inputvalidation_1.validateColorInputs, validation_1.handleInputErrors, colores_controller_1.ColorController.createColor)
    .get(colores_controller_1.ColorController.getAllColor);
router.route('/:id').get(colores_controller_1.ColorController.getColor).patch(color_inputvalidation_1.validateColorInputs, validation_1.handleInputErrors, colores_controller_1.ColorController.updateColor).delete(colores_controller_1.ColorController.deleteColor);
exports.default = router;
//# sourceMappingURL=colores.router.js.map