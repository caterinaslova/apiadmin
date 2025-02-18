import {Router} from 'express'
import { validationMongoId } from '../inputsValidation/validationMongoId'
import { CategoriaController } from '../controllers/categorias.controller'
import { validateCategoriaExists, validateCategoriasInputs } from '../inputsValidation/categoria.inputvalidation'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

router.param('id',validationMongoId)
router.param('id',validateCategoriaExists )

router.route('/').get(CategoriaController.getAllCategoria).post(validateCategoriasInputs,handleInputErrors,CategoriaController.createCategoria)
router.route('/:id').get(CategoriaController.getCategoria).patch(validateCategoriasInputs,handleInputErrors,CategoriaController.updateCategoria).delete(CategoriaController.deleteCategoria).post(CategoriaController.uploadImageCategoria)


export default router