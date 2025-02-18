import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { conectarBD } from './config/db'
import { handleErrors } from './utils/handleErrors'
import { notFound } from './utils/notFound'
import fileUpload from 'express-fileupload'

// routes
import colorRouter  from './routes/colores.router'
import categoriaRouter from './routes/categorias.router'


const app = express()
app.use(express.json({limit:'10mb'}))
app.use(fileUpload())
app.use(express.static('./public'))


app.use('/api/colores',colorRouter)
app.use('/api/categorias',categoriaRouter)



conectarBD(process.env.DATABASE_URL)

app.use(handleErrors)
app.use(notFound)

const port= process.env.PORT || 4000
app.listen(port,()=>console.log(`La app está escuchando en el puerto ${port}`))