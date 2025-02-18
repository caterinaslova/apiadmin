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