import type {Request,Response,NextFunction} from 'express'
import { validationResult } from 'express-validator'

export const handleInputErrors=(req:Request,res:Response,next:NextFunction)=>{

           // manejar Errores
           let errors = validationResult(req)
        
           const mensajesDeError = errors.array().map(error=>error.msg).join(". ")
          
           if (!errors.isEmpty()){
                res.status(400).json({mensaje:mensajesDeError})
                return
           }
           next()

}