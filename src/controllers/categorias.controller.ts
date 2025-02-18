import {Request,Response, NextFunction } from "express";
import Categoria from '../models/categoria.modelo'
import { SearchSchema, SortCategoriaSchema } from "../schemas";
import fs from 'fs'
import slugify from "slugify";
import {  UploadedFile } from "express-fileupload";
import { BadRequestError } from "../errors";






const  PRODUCTS_PER_PAGE= Number(process.env.PRODUCTS_PER_PAGE)
const RUTA_FOTOS = './public/imagenes'


export class CategoriaController {
    static createCategoria= async (req:Request,res:Response,next:NextFunction)=>{
        try {

            const {nombreCategoria,descripcionCategoria,tipoCategoria,ordenEnMenu, validaActualmente,carpetaFotos}= req.body


            const nombreCarpetaFotosVerificada = slugify(carpetaFotos.toLowerCase(),'-')

            const categoria = new Categoria

            categoria.codigoCategoria= slugify(nombreCategoria.toLocaleLowerCase(),'-')
            categoria.nombreCategoria = nombreCategoria.toLowerCase()
            categoria.descripcionCategoria = descripcionCategoria.toLowerCase()
            categoria.tipoCategoria = tipoCategoria
            categoria.ordenEnMenu = ordenEnMenu
            categoria.validaActualmente=validaActualmente
            categoria.imagenCategoria="imagenvacia.jpg"
            categoria.carpetaFotos=nombreCarpetaFotosVerificada

            await categoria.save()

            const path= `${RUTA_FOTOS}/${nombreCarpetaFotosVerificada}`
           
            fs.access(path,(error)=>{
                if(error){
                    fs.mkdir(path,{recursive:true},(error)=>{
                        if(error){
                            res.status(409).json({mensaje:'Conflicto con la carpeta donde se guardan las fotos'})
                            return
                        }                       
                    })
                }
            })

            res.status(201).json({mensaje:'Categoría agregada correctamente',categoria})

        } catch (error) {
            next(error)
        }
    }
    static getAllCategoria= async (req:Request,res:Response,next:NextFunction)=>{

        let search=""
        let sort="ordenEnMenu"

        try {
            if (req.query.search){

                search = SearchSchema.parse(req.query.search)
             }
          
             if(req.query.sort){
     
                 sort = SortCategoriaSchema.parse(req.query.sort)
             }
                        

            let resultado = await Categoria.find({$or:[{nombreCategoria:{ $regex: search, $options: 'i' }},{tipoCategoria:{ $regex:search , $options:'i'}}]})

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


            if (sort && sort=== "-nombreCategoria"){

                resultado = resultado.sort((a,b)=>{
                
                    if (a.nombreCategoria.toLowerCase() < b.nombreCategoria.toLowerCase()) {
                        return 1;
                      }
                      if (a.nombreCategoria.toLowerCase() > b.nombreCategoria.toLowerCase()) {
                        return -1;
                      }
                      // a must be equal to b
                      return 0;
                })
            }

          
            if (sort && sort=== "nombreCategoria"){

                resultado = resultado.sort((a,b)=>{
                
                    if (a.nombreCategoria.toLowerCase() > b.nombreCategoria.toLowerCase()) {
                        return 1;
                      }
                      if (a.nombreCategoria.toLowerCase() < b.nombreCategoria.toLowerCase()) {
                        return -1;
                      }
                      // a must be equal to b
                      return 0;
                })
            }
            if (sort && sort=== "-tipoCategoria"){

                resultado = resultado.sort((a,b)=>{
                
                    if (a.tipoCategoria.toLowerCase() < b.tipoCategoria.toLowerCase()) {
                        return 1;
                      }
                      if (a.tipoCategoria.toLowerCase() > b.tipoCategoria.toLowerCase()) {
                        return -1;
                      }
                      // a must be equal to b
                      return 0;
                })
            }

          
            if (sort && sort=== "tipoCategoria"){

                resultado = resultado.sort((a,b)=>{
                
                    if (a.tipoCategoria.toLowerCase() > b.tipoCategoria.toLowerCase()) {
                        return 1;
                      }
                      if (a.tipoCategoria.toLowerCase() < b.tipoCategoria.toLowerCase()) {
                        return -1;
                      }
                      // a must be equal to b
                      return 0;
                })
            }
           
            if(sort && sort==="ordenEnMenu")resultado.sort((a, b) => a.ordenEnMenu - b.ordenEnMenu);

            if(sort && sort==="-ordenEnMenu")resultado.sort((a, b) => b.ordenEnMenu - a.ordenEnMenu);

        
         
         
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
            next(error)
        }
    }
    static getCategoria= async (req:Request,res:Response,next:NextFunction)=>{
        try {
           
            res.status(200).json(req.categoria)
        } catch (error) {
            next(error)
        }
    }



    static updateCategoria= async (req:Request,res:Response,next:NextFunction)=>{
        let imagen:UploadedFile | UploadedFile[] | any
        let nombreImagen:string
        
        try {
            const {nombreCategoria,descripcionCategoria,tipoCategoria,ordenEnMenu, validaActualmente,imagenCategoria,carpetaFotos}= req.body

          
            const categoria = await Categoria.findById(req.categoria.id)

            categoria.codigoCategoria=slugify(nombreCategoria.toLocaleLowerCase(),'-')
            categoria.nombreCategoria = nombreCategoria ? nombreCategoria :req.categoria.nombreCategoria
            categoria.descripcionCategoria = descripcionCategoria ?descripcionCategoria :req.categoria.descripcionCategoria
            categoria.tipoCategoria= tipoCategoria ? tipoCategoria : req.categoria.tipoCategoria
            categoria.ordenEnMenu = ordenEnMenu ? ordenEnMenu : req.categoria.ordenEnMenu
            categoria.validaActualmente = validaActualmente ? validaActualmente :req.categoria.validaActualmente
            categoria.carpetaFotos =carpetaFotos ? carpetaFotos : req.categoria.carpetaFotos

         

            categoria.save()

            res.status(200).json({mensaje:'Categoría modificada correctamente'})

        } catch (error) {
         
            next(error)
        }
    }




    static deleteCategoria= async (req:Request,res:Response,next:NextFunction)=>{
        try {
            await Categoria.deleteOne({_id:req.categoria._id})
            res.status(200).json({mensaje:`La categoría  ${req.categoria.nombreCategoria} ha sido eliminada.`})
        } catch (error) {
            next(error)
        }
    }



    static uploadImageCategoria = async (req:Request,res:Response,next:NextFunction)=>{
        try {
           
            let imagen:UploadedFile | UploadedFile[] | any
            let nombreImagen:string

            if(req.files){
                  
                imagen= req.files.imagenCategoria

                // valido la extension del archivo
           
                const tipoArchivo = Object.entries(req.files.imagenCategoria).filter((renglon)=>{
                    if (renglon[0]==="mimetype")return renglon[1]                        
                })
                if (tipoArchivo[0][1] !== "image/jpeg" && tipoArchivo[0][1]!== "image/png"){
                    throw new BadRequestError('Debe ingresar un archivo con extensión jpg o png')
                }

                const tamanoArchivo = Object.entries(req.files.imagenCategoria).filter((renglon)=>{
                    if (renglon[0]==="size")return renglon[1]                        
                })
              
                if (tamanoArchivo[0][1] > 1000000){
                    throw new BadRequestError('Debe ingresar un archivo de tamaño menor a 1mb')
                }
                const nombreArchivo = Object.entries(req.files.imagenCategoria).filter((renglon)=>{
                    if (renglon[0]==="name")return renglon[1]                        
                })
                nombreImagen=req.categoria._id + '-'+nombreArchivo[0][1]

                // VERIFICO QUE NO SE HAYA BORRADO LA CARPETA
                 const path= `${RUTA_FOTOS}/${req.categoria.carpetaFotos}`
                 fs.access(path, (error)=>{
                    if(error){
                        fs.mkdir(path,{recursive:true},(error)=>{
                             // movemos el archivo a la Carpeta
                            const ruta= `${RUTA_FOTOS}/${req.categoria.carpetaFotos}/${nombreImagen}`
                             imagen.mv(ruta,(error:unknown)=>{
                                if(error){
                                  res.status(409).json({mensaje:'Conflicto al guardar la foto.Reintente'})
                                  return
                                }
                              })
                            if(error){
                                res.status(409).json({mensaje:'Conflicto con la carpeta donde se guardan las fotos'})
                                return
                            }                      
                        })
                    }else{
                         // movemos el archivo a la Carpeta
                        const ruta= `${RUTA_FOTOS}/${req.categoria.carpetaFotos}/${nombreImagen}`

                        imagen.mv(ruta,(error:unknown)=>{
                          if(error){
                            res.status(409).json({mensaje:'Conflicto al guardar la foto.Reintente'})
                            return
                          }
                        })

                    }
                })

                const categoria = await Categoria.findById(req.categoria.id)    
                categoria.imagenCategoria = req.files ? nombreImagen : req.categoria.imagenCategoria
                categoria.save()

                res.status(200).json({mensaje:'foto cargada'})
          
        }
            
        } catch (error) {
            next(error)
        }

    }
}
