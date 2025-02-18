import type {Request,Response,NextFunction} from 'express'
import { param, validationResult } from 'express-validator'

export const validationMongoId = async (req:Request,res:Response,next:NextFunction)=>{

    await param('id').isString().isLength({min:24,max:24}).isHexadecimal().withMessage('Id no válido').run(req)
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({mensaje:'Id no válido'})
        return
    }

    next()
}