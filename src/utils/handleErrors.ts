import type { Request,Response,NextFunction } from "express"
import { StatusCodes } from "http-status-codes";

export const handleErrors = (error:any,req:Request,res:Response,next:NextFunction)=>{

    let mensajeError=error.message

    let customError = {
        // set default
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || 'Hubo un error. Consulte con el programador',
      };


    if (error.errorResponse && error.errorResponse.code===11000) {
        customError.message = `'Los códigos/nombres no pueden repetirse'`;
        customError.statusCode = 400;
      }
      if(error.status===400 && error.type=== 'entity.parse.failed'){
        customError.message="Error en el Json con el que se ingresaron los datos"
        customError.statusCode = 400
      }
    // console.log(error)
    res.status(customError.statusCode).json({ mensaje: customError.message });
    return
}