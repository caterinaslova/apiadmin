import {Schema,model} from 'mongoose'

const ColorSchema = new Schema({
    codigoColor:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    nombreColor: {
        type:String,
        required:true,
        lowercase:true
    }
    
},{timestamps:true})
export default model('Color',ColorSchema)