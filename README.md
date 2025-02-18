Este es un proyecto tipo API, porque los datos en la pantalla van a ser leidos por el frontend escrito en NEXTJS

Para comenzar un proyecto en nodejs con typescript debo instalar:

npm init para que se escriba el package.json con los datos

express: es el framework (marco de trabajo) del backend de Nodejs que me permite generar los endpoints, el enrutamiento,etc
typescript: es un lenguaje tipado( se escribe cada tipo de dato) que me facilita el autocompletado y control de errores 
           mientras programo la aplicación.
ts-node: me permite ejecutar la app escrita en typescript
morgan: es una herramienta de desarrollo para ver las peticiones http
dotenv: es para las variables de entorno
mongoose: es para interactuar con la base de datos de MONGODB
express-validator: para validar la entrada de datos válidos por parte del usuario

@types/...: es porque estoy programando la app en typescript

## -----------------------------------------------
npm i express typescript ts-node dotenv morgan mongoose express-validator @types/express @types/morgan
npm i slugify

## -----------------------------------------------


1- creo una carpeta src para que todo lo que yo escriba esté ahí dentro
2- escribo copiando de otro proyecto en la carpeta de backend el tsconfig.json ( ver para qué es cada opción)
    si no está ese archivo no sabe que debe compilar. Es muy importante escribirlo antes de probar si conecta.

    tsconfig.json

    ----
    {
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src",
        "lib": ["esnext"],
        "target": "ESNext",
        "moduleResolution": "NodeNext",
        "module": "NodeNext",
        "strict": false,
        "sourceMap": true,
        "esModuleInterop": true,
        "declaration": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
    },
    "include": ["src/**/*.ts"]
}
    ----
3-escribo los scripts de desarrollo, build ( construcción) y ejecución en el package.json y los pruebo. Los copio 
    de proyectos anteriores.
    Uso nodemon en modo desarrollo para poder hacer cambios. Solo sabe que debe usar ts-node en vez de node porque
    está en typescript.

    En el package.json

    ---
    "dev": "nodemon src/index.ts",
    "dev:api": "nodemon src/index.ts --api",
    "build": "tsc",
    "start": "node ./dist/index.js",
    ---

    el dev:api es porque cuando comienzo a usar el frontend- configuro el cors y no funciona con POSTMAN. Al poner --api
    usa la configuracion para que permita usar POSTMAN o similar- Más adelante voy a instalar el cors y configurarlo

4- dentro del src escribo el index.ts - con un console.log('app KyV') para verificar scripts

5- para "test": voy a usar "jest" pero al final.Ahora borro lo escrito en "test"
6- Armo las carpetas dentro src para que el proyecto esté organizado. Puedo poner cualquier nombre. Uso esos porque son los que usan en la comunidad de programadores


en backend/src/
-----
    -config
    -controllers
    -routes
    -models
    -utils
    -middleware
----

    // explicación
    -config: para poner todas las configuraciones y conexiones- Por ejemplo: cors - conexión a la base de batos, cloudinary si quiero, etc.
    - controllers: donde van a estar las funciones de cada tarea que se realice, como crear un registro, leerlo, modificarlo, borrarlo, etc
    - routes: donde van a estar las rutas que deben escribirse en el browser para ejecutar la correspondiente función en el controlador y que devuelva una respuesta. Tambien aquí se validan los datos.
    -models: donde van a estar los esquemas de las bases de datos.
    -utils: funciones útiles que uso en varias partes.
    -middleware: donde van a estar las funciones que verifican alguna cosa, antes de pasar a la siguiente. Por ejemplo
    auth.ts que verifica si el usuario se autenticó bien o no para poder hacer algo.


    7- voy a completar el index.ts
     -Lo primero es crear el .env en la parte principal del backend para ya poner las variables de entorno- que son los valores que no quiero que sean publicos. Cuando lo subo al git, esos valores no suben porque los voy a poner en gitignore junto con los modulos de node node_modules.
     En el archivo .env pongo PORT=4000 para enpezar, después voy a poner las conexiones a la base de datos y el jsonwebtoken y demás claves importantes

     -configuro del dotenv en el index.ts, creo la app de express y la pongo a funcionar en el puerto correspondiente
    

    ########################### index.ts #################################
            import dotenv from 'dotenv'
            dotenv.config()
            import express from 'express'

            const app = express()

            const port= process.env.PORT || 4000
            app.listen(port,()=>console.log(`La app está escuchando en el puerto ${port}`))
    ##########################################################################

    8- creo el .gitignore.json
    -----------------
       .env
        node_modules/
    ----------------

    9- Pongo el middleware de error por las dudas suceda algo inesperado. Salga ese error. Más adelante porngo un mensaje personalizado.

    --------------------

    app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
            console.log('errores incio',error)
            next()
    })
    --------------------
    leer manejo de errores
    https://stackoverflow.com/questions/50218878/typescript-express-error-function

    ##################################################################
    ##################################################################

    Ahora voy a empezar con un crud básico- colores

    1- en la carpeta routes
        creo archivo colores.router.ts
        escribo las rutas
        -------------------------
        ## colores.router.ts

            import {Router} from 'express'

            const router = Router()

            router.route('/').post().get()
            router.route('/:id').get().patch().delete()

            export default router
        -------------------------


    2- en la carpeta controllers
        creo archivo colores.controller.ts
        escribo las funciones correspondientes
        las conecto con las rutas
        --------------------------------------------
        ## colores.controller.ts

        import type { Request, Response } from 'express'

        export class ColorController{
            static createColor = async(req:Request,res:Response)=>{
                res.json('create color')
            }
            static getAllColor = async(req:Request,res:Response)=>{
                res.json('get all color')
            }
            static getColor = async(req:Request,res:Response)=>{
                res.json('get  color')
            }
            static updateColor = async(req:Request,res:Response)=>{
                res.json('update color')
            }
            static deleteColor = async(req:Request,res:Response)=>{
                res.json('delete color')
            }
        }
        --------------------------------------------
    3- incorporamos el router en el index.ts - tambien el middleware de json() para poder leer el body en todos los create

    ## index.ts

    ...
    import colorRouter  from './routes/colores.router'
    ....

    app.use(express.json())

    app.use('/api/colores',colorRouter)

    4- pruebo mensajes de las rutas en Thunder o Postman para ver que todo conecte.

    5- Debo hacer el modelo que sería cómo es la tabla en la base de datos.
    6- Antes hago la conexión a la base de datos con mongoose porque uso MongoDB- si usara postgres usaría prisma o sequelize.
    #######################
    Conexión a la base de datos
    en el .env escribo el string de conexión a la BD de manera local- es decir en el localhost ( después le voy a agregar el usuario y contraseña para el VPS)
    -------------------------------------------
    DATABASE_URL=mongodb://127.0.0.1:27017/base
    -----------------------------------------


    En la carpeta config- creo archivo db.ts
    -------------------------------------
    import { connect } from "mongoose";

    export const conectarBD = async(stringConexion:string)=>{
        try {
            await connect(stringConexion)
            console.log('Base de datos conectada')
            
        } catch (error) {
            console.log('Error al conectar la base de datos:', error.message)
            process.exit(1)
        }
    }
    -----------------------------------

    En el index.ts agrego
    conectarBD(process.env.DATABASE_URL)

    El index.ts va quedando asi
    ////////////////////////////////////////////////////////////////////////////////////////////
    import dotenv from 'dotenv'
    dotenv.config()
    import express from 'express'
    import type { Request, Response,NextFunction } from 'express'
    import colorRouter  from './routes/colores.router'
    import { conectarBD } from './config/db'


    const app = express()

    app.use(express.json())

    app.use('/api/colores',colorRouter)

    conectarBD(process.env.DATABASE_URL)

    app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
        console.log('errores incio',error)
        next()
    })

    const port= process.env.PORT || 4000
    app.listen(port,()=>console.log(`La app está escuchando en el puerto ${port}`))
    ///////////////////////////////////////////////////////////////////////////////////////////

    -------------------------------------------------------------------
    Sigo con el primer modelo- que es como es el documento o tabla en la base de datos
    Carpeta models creo archivo color.model.ts

    import {Schema,model} from 'mongoose'

    const ColorSchema = new Schema({
        codigoColor:{
            type:String,
            unique:true,
            required:true
        },
        nombreColor: {
            type:String,
            required:true
        }
        
    },{timestamps:true})
    export default model('Color',ColorSchema)
    --------------------------------------------------

    Vamos al controlador de create- verificamos leer el body y creamos un registro

            try {
            const {codigoColor, nombreColor} = req.body
            const color = new Color
            color.codigoColor= codigoColor
            color.nombreColor = nombreColor
            await color.save()
            res.status(201).json({mensaje:'Color agregado correctamente'})
            
        } catch (error) {
            const errorGenerado = new Error ('Hubo un error')
            res.status(500).json({mensaje:errorGenerado.message})
            
        }
       --------------------------------------------------------

       Pero para hacer validaciones, no usamos mongoose, sino express-validator.
       Hacemos las validaciones en el router 
       -------------------------------------------------------
       router.route('/')
        .post(
            body('codigoColor').notEmpty().withMessage('El código del color no puede estar vacío').isLength({max:15}).withMessage('El código del color debe tener menos de 15 caracteres'),
            body('nombreColor').notEmpty().withMessage('El nombre del color no puede estar vacío').isLength({max:15}).withMessage('El código del color debe tener menos de 30 caracteres'),
            handleInputErrors,
            ColorController.createColor)
        .get(ColorController.getAllColor)
       ---------------------------------------------------------
       En el middleware - debo escribir la funcion de manejo de errores de entrada handleInputError
       /////////////////////////validation.ts/////////////////////////////////////////////

       import type {Request,Response,NextFunction} from 'express'
        import { validationResult } from 'express-validator'

        export const handleInputErrors=(req:Request,res:Response,next:NextFunction)=>{

                // manejar Errores
                let errors = validationResult(req)
                const mensajesDeError = errors.array().map(error=>error.msg)

                if (!errors.isEmpty()){
                        res.status(400).json(mensajesDeError)
                        return
                }
                next()

        }

       ///////////////////////////////////////////////////////////////////////


       ## Continúo con getAllcolores en el controlador
           static getAllColor = async(req:Request,res:Response)=>{
                try {
                    const colores = await Color.find({})
                    res.status(200).json(colores)
                } catch (error) {
                    console.log(error)
                    const errorGenerado = new Error ('Hubo un error al leer todos')
                    res.status(500).json({mensaje:errorGenerado.message})
                }
            }

    /////////////////////////////////////////////////////////////////////////
    
    #### Corrijo errores- Por ejemplo. Si pongo mal el tipo de dato en el json- la app se traba. 
    Para que continúe y me permita corregir el error. En el index.ts capto el error
    -------------------------------------------------------------------------
    app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
        console.log('errores incio no identificados',error)
        const errorGenerado = new Error ('Errores en la entrada de datos')
        res.status(409).json({mensaje:errorGenerado.message})
        return
    })
    -------------------------------------------------------------------------

    ###En el controlador, para evitar codigos repetidos del campo al que yo le puse unique en el modelo
    -------------------------------------------------------------------------------------

    .....
            } catch (error) {
           
                if ( error.errorResponse.code===11000){
                    const errorGenerado = new Error ('Los códigos no pueden repetirse')
                    res.status(409).json({mensaje:errorGenerado.message})
                    return

                }


            const errorGenerado = new Error ('Hubo un error al grabar')
            res.status(500).json({mensaje:errorGenerado.message})
            return
            
        }
    .....
    -----------------------------------------------------------------------------------

    ### Para que el router quede más limpio. Separo las validaciones en un middleware aparte donde voy a poner todas las validaciones de cada tabla
    creo carpeta  inputsValidation
    y el primer archivo  color.inputValidation.ts

    Ahí hago las validaciones- Es igual que antes solo que debo agregar run(req)

    ---------------------------------------------------------------------------------
    import {Request,Response, NextFunction } from "express";
    import {body} from 'express-validator'

    export const validateColorInputs = async (req:Request,res:Response, next:NextFunction)=>{

        await  body('codigoColor').isString().withMessage('El codigo debe ser un string').notEmpty().withMessage('El código del color no puede estar vacío').isLength({max:15}).withMessage('El código del color debe tener menos de 15 caracteres').run(req)

        await body('nombreColor').isString().withMessage('El nombre debe ser un string').notEmpty().withMessage('El nombre del color no puede estar vacío').isLength({max:15}).withMessage('El código del color debe tener menos de 30 caracteres').run(req)

        next()
    }
    ----------------------------------------------------------------------------------
    Así el router quedaría así
    -------------------------------------------------------

    import {Router} from 'express'
    import { ColorController } from '../controllers/colores.controller'
    import { handleInputErrors } from '../middleware/validation'
    import { validateColorInputs } from '../inputsValidation/color.inputvalidation'


    const router = Router()

    router.route('/')
    .post(
        validateColorInputs,
        handleInputErrors,
        ColorController.createColor)
    .get(ColorController.getAllColor)


    router.route('/:id').get(ColorController.getColor).patch(ColorController.updateColor).delete(ColorController.deleteColor)

    export default router
    ----------------------------------------------------

    ## Continuo con leer el parametro que me indica el codigo a buscar. 
    - Validar que el parámetro sea un id válido y que exista antes de entrar al controlador
    -Después hacer lo que corresponda, ya sea leer, modificar, eliminar

    //// Validaciones- carpeta inputsValidation
    1) validationMonId.ts para verificar que sea un id válido en mongodb
    -------------------------------------------------------------------
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
    ---------------------------------------------------------------------

    Ponerlo en el router de color.router.ts
    ##  
            router.param('id',validationMongoId)
    -------------------------------------------------------------
    Validar de que ese id exista- en color.inputvalidation.ts
    ---------------------------------------------------------------
    .....
    lo declaro en el req. Si existe lo pongo para pasarlo al controlador

    declare global{
        namespace Express{
            interface Request{
                color?:ColorType
            }
        }
    }

    ....
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
------------------------------------------------------------

Poner esa validacion en el router
##   router.param('id',validationMongoId)
    router.param('id',validateColorExists)

    ///////////////////////////////////////////////////////////////

    hacer el controlador
-----------------------------------------------------------------
.......

    static getColor = async(req:Request,res:Response)=>{
        try {
 
            res.status(200).json(req.color)
            
        } catch (error) {
            console.log(error)
            const errorGenerado = new Error ('Hubo un error al leer un color por id')
            res.status(500).json({mensaje:errorGenerado.message})
        }
    }
    static updateColor = async(req:Request,res:Response)=>{
        try {

            const {nombreColor,codigoColor} = req.body
            const color = await Color.findOneAndUpdate(req.color._id,{
                codigoColor:codigoColor,
                nombreColor:nombreColor
            },{new:true}).select('-__v')
            res.status(200).json(color)
            
        } catch (error) {
            if ( error.errorResponse.code===11000){
                const errorGenerado = new Error ('Los códigos no pueden repetirse')
                res.status(409).json({mensaje:errorGenerado.message})
                return

            }
        const errorGenerado = new Error ('Hubo un error al grabar')
        res.status(500).json({mensaje:errorGenerado.message})
        return
            
        }

    }
    static deleteColor = async(req:Request,res:Response)=>{
        try {
            await Color.deleteOne({_id:req.color._id})
            res.status(200).json({mensaje:`El color con id ${req.color._id} ha sido eliminado.`})
            
        } catch (error) {
            console.log(error)
            const errorGenerado = new Error ('Hubo un error al eliminar un color por id')
            res.status(500).json({mensaje:errorGenerado.message})
        }
    }
.....
---------------------------------------------------------------

#########################################################################################################
########################     Sigo con el frontend    ####################################################
#########################################################################################################

Conecto ambos y lo subo al VPS para verificar funcionamiento
--------------------------
Hago el build- corrijo errores

Voy a hacer otro crud- proveedores que es largo pero independiente y despues todo lo de USER para incorporar
autenticación.

--------------------------------------------------------------------------------------------------

## ) En el backend

Para que el codigo, slug o nombres de carpetas y archivos no tenga espacios

npm i slugify

slugify(variable,'-')
