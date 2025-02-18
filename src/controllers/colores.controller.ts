import type { NextFunction, Request, Response } from 'express'
import Color from '../models/color.modelo'
import {  SearchSchema,  SortColorSchema} from '../schemas';
import { ZodError } from 'zod';
import { BadRequestError, CustomAPIError } from '../errors';

const  PRODUCTS_PER_PAGE= Number(process.env.PRODUCTS_PER_PAGE)



export class ColorController{
    static createColor = async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {codigoColor, nombreColor} = req.body

            const color = new Color
            color.codigoColor= codigoColor.toLowerCase()
            color.nombreColor = nombreColor.toLowerCase()

            await color.save()
            res.status(201).json({mensaje:'Color agregado correctamente'})
            
        } catch (error) {
            next(error)
        }
    }
    
    static getAllColor = async(req:Request,res:Response,next:NextFunction)=>{
        let search=""
        let sort="nombreColor"
       
        try {

            if (req.query.search){

                search = SearchSchema.parse(req.query.search)
             }
          
             if(req.query.sort){
     
                 sort = SortColorSchema.parse(req.query.sort)
             }
            
             
                   
            let resultado =await Color.find({$or:[{nombreColor:{ $regex: search, $options: 'i' }},{codigoColor:{ $regex: search, $options: 'i' }}]}).sort({"nombreColor":1})

            if(!resultado.length){

                res.status(200).json({          
                    datos: [],
                    metadatos:{
                        total: 0,
                        paginas: 1,
                        actual:1,
                        paginacion:10
                    }
                })
                return
            }

                      
            if (sort && sort=== "-codigoColor"){

                resultado = resultado.sort((a,b)=>{
                
                    if (a.codigoColor.toLowerCase() < b.codigoColor.toLowerCase()) {
                        return 1;
                      }
                      if (a.codigoColor.toLowerCase() > b.codigoColor.toLowerCase()) {
                        return -1;
                      }
                      // a must be equal to b
                      return 0;
                })
            }

          
            if (sort && sort=== "nombreColor"){

                resultado = resultado.sort((a,b)=>{
                
                    if (a.nombreColor.toLowerCase() > b.nombreColor.toLowerCase()) {
                        return 1;
                      }
                      if (a.nombreColor.toLowerCase() < b.nombreColor.toLowerCase()) {
                        return -1;
                      }
                      // a must be equal to b
                      return 0;
                })
            }
            if (sort && sort==="-nombreColor"){

                resultado = resultado.sort((a,b)=>{
                
                    if (a.nombreColor.toLowerCase() < b.nombreColor.toLowerCase()) {
                        return 1;
                      }
                      if (a.nombreColor.toLowerCase() > b.nombreColor.toLowerCase()) {
                        return -1;
                      }
                      // a must be equal to b
                      return 0;
                })
            }

         
            const totalItems= resultado.length
         
            let page = Number(req.query.page) || 1;

            const limit = Number(req.query.limit) || PRODUCTS_PER_PAGE;

            const ultimaPage = Math.ceil(totalItems/limit)

            if (page < 1) page=1;
            if(page>ultimaPage)page=ultimaPage;

          

            const skip = (page-1)*limit
            const ultimoRegistro=skip+limit
      
            const resultadoLimitado = resultado.filter((item,index)=>{
        
                if (index>skip-1){
                   
                    if(index < ultimoRegistro){
                         return item
                    }  
                        
                }
                  
            })
            res.status(200).json({          
                datos: resultadoLimitado,
                metadatos:{
                    total: totalItems,
                    paginas: ultimaPage,
                    actual:page,
                    paginacion:limit
                }
            });

        } catch (error) {

            let errorProducido = new BadRequestError(error)
            if (ZodError){
                   const errors:string = error.errors.map(error=>error.message).join(". ")
                 errorProducido = new BadRequestError(errors)
            }

            next(errorProducido)
        }
    }
    static getColor = async(req:Request,res:Response,next:NextFunction)=>{
        try {
 
            res.status(200).json(req.color)
            
        } catch (error) {
            next(error)
        }
    }
    static updateColor = async(req:Request,res:Response,next:NextFunction)=>{
        try {

            const {nombreColor,codigoColor} = req.body
            const color = await Color.findOneAndUpdate(req.color._id,{
                codigoColor:codigoColor.toLowerCase(),
                nombreColor:nombreColor.toLowerCase()
            },{new:true}).select('-__v')
            
            res.status(200).json({mensaje:'Color modificado correctamente'})
            
        } catch (error) {
            next(error)
            
        }

    }
    static deleteColor = async(req:Request,res:Response,next:NextFunction)=>{
        try {
           
            await Color.deleteOne({_id:req.color._id})
            res.status(200).json({mensaje:`El color  ${req.color.nombreColor} ha sido eliminado.`})
            
        } catch (error) {
            next(error)
        }
    }
}