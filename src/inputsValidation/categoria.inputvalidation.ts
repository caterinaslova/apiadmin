import { Request,Response,NextFunction } from "express"
import { body } from "express-validator"
import Categoria from "../models/categoria.modelo"
import { CategoriaType } from "../types"

declare global{
    namespace Express{
        interface Request{
            categoria?:CategoriaType & {codigoCategoria:string,nombreCategoria:string,descripcionCategoria:string,tipoCategoria:'Mercadería Reventa'|'Ingreso Contable'|'Egreso Contable',ordenEnMenu:number,validaActualmente:'on' | 'off',imagenCategoria:string,carpetaFotos:string}
        }
    }
}


export const validateCategoriasInputs = async(req:Request,res:Response,next:NextFunction)=>{

    await body('nombreCategoria').isString().withMessage('El nombre de la categoria debe ser un string').notEmpty().withMessage('El nombre de la categoría no puede ir vacío').isLength({min:5,max:40}).withMessage('La categoría debe tener una extensión de mínimo 5 y máximo 40 caracteres').run(req)

    await body('descripcionCategoria').isString().withMessage('La descripción de la categoria debe ser un string').notEmpty().withMessage('La descripción de la categoría no puede ir vacío').isLength({min:5,max:40}).withMessage('La descripción de la categoría debe tener una extensión de mínimo 5 y máximo 40 caracteres').run(req)

    await body('tipoCategoria').isIn(['Mercadería Reventa','Ingreso Contable','Egreso Contable']).withMessage('La categoría de ser una de las 3 opciones propuestas.').notEmpty().withMessage('Debe elegir una opción de tipo de Categoría').run(req)

    await body('ordenEnMenu').isNumeric().withMessage('El orden debe ser un numero').isInt({min:1}).withMessage('El orden en Menú debe ser un número entero').run(req)

    await body('validaActualmente').isIn(['on','off']).withMessage('El campo validaActualmente solo puede ser on o off').run(req)

    // await body('imagenCategoria').isString().withMessage('El campo imagen solo acepta un string con el nombre de la imagen').optional().run(req)

    await body('carpetaFotos').isString().withMessage('El campo carpeta solo acepta un string con el nombre de la carpeta de la imagen').run(req)

    next()
}

export const validateCategoriaExists = async(req:Request,res:Response,next:NextFunction)=>{
    const {id} = req.params
    const categoria = await Categoria.findById(id).select('-__v')
    if(!categoria){

        const errorGenerado = new Error (`No existe la categoria con el id: ${id}`)
        res.status(404).json({mensaje:errorGenerado.message})
        return

    }
    req.categoria = categoria

    next()
}
