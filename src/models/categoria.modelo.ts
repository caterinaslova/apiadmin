import {Schema,model} from 'mongoose'

const categoriaSchema = new Schema ({
    codigoCategoria:{
        type:String,
        unique:true,
        required:true
    },
    nombreCategoria:{
        type:String,
        unique:true,
        required:true
    },
    descripcionCategoria:{
        type:String,
        required:true
    },
    tipoCategoria:{
        type:String,
        enum:{values:['Mercadería Reventa','Ingreso Contable','Egreso Contable'],message:'{VALUE} no es válido.'},
        required:true
    },
    ordenEnMenu:{
        type:Number,
        required:true
    },
    validaActualmente:{
        type:String,
        enum:{values:['on','off'],message:'{VALUE} no es válido.'},
        default:'on'
    },
    imagenCategoria:{
        type:String,
        default:'imagen01.jpg'
    },
    carpetaFotos:{
        type:String,
        default:'capeta01'
    }
},{timestamps:true})

export default model('Categoria',categoriaSchema)