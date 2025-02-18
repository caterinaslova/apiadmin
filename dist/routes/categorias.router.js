"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMongoId_1 = require("../inputsValidation/validationMongoId");
const categorias_controller_1 = require("../controllers/categorias.controller");
const categoria_inputvalidation_1 = require("../inputsValidation/categoria.inputvalidation");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.param('id', validationMongoId_1.validationMongoId);
router.param('id', categoria_inputvalidation_1.validateCategoriaExists);
router.route('/').get(categorias_controller_1.CategoriaController.getAllCategoria).post(categoria_inputvalidation_1.validateCategoriasInputs, validation_1.handleInputErrors, categorias_controller_1.CategoriaController.createCategoria);
router.route('/:id').get(categorias_controller_1.CategoriaController.getCategoria).patch(categoria_inputvalidation_1.validateCategoriasInputs, validation_1.handleInputErrors, categorias_controller_1.CategoriaController.updateCategoria).delete(categorias_controller_1.CategoriaController.deleteCategoria).post(categorias_controller_1.CategoriaController.uploadImageCategoria);
exports.default = router;
//# sourceMappingURL=categorias.router.js.map