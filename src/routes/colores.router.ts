import {Router} from 'express'
import { ColorController } from '../controllers/colores.controller'
import { handleInputErrors } from '../middleware/validation'
import { validateColorExists, validateColorInputs } from '../inputsValidation/color.inputvalidation'
import { validationMongoId } from '../inputsValidation/validationMongoId'


const router = Router()

router.param('id',validationMongoId)
router.param('id',validateColorExists)

router.route('/')
.post(
    validateColorInputs,
    handleInputErrors,
    ColorController.createColor)
.get(ColorController.getAllColor)


router.route('/:id').get(ColorController.getColor).patch(validateColorInputs,handleInputErrors,ColorController.updateColor).delete(ColorController.deleteColor)

export default router