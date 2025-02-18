import {Request,Response, NextFunction } from "express";
import {body} from 'express-validator'
import Color from '../models/color.modelo'
import { ColorType } from "../types";



declare global{
    namespace Express{
        interface Request{
            color?:ColorType & {codigoColor:string; nombreColor:string}
        }
    }
}

export const validateColorInputs = async (req:Request,res:Response, next:NextFunction)=>{
    

    await  body('codigoColor').isString().withMessage('El codigo debe ser un string').notEmpty().withMessage('El código del color no puede estar vacío').isLength({max:15}).withMessage('El código del color debe tener menos de 15 caracteres').run(req)

    await body('nombreColor').isString().withMessage('El nombre debe ser un string').notEmpty().withMessage('El nombre del color no puede estar vacío').isLength({max:25}).withMessage('El código del color debe tener menos de 25 caracteres').run(req)

    next()
}

export const validateColorExists = async( req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params
    const color = await Color.findById(id).select('-__v')   
    if (!color){
        const errorGenerado = new Error (`No existe el color con el id: ${id}`)
        res.status(404).json({mensaje:errorGenerado.message})
        return
    }
    req.color = color   
    next()
}

