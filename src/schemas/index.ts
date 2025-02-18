import z from "zod";

export const SearchSchema = z.string({message:'Solo puede ser un string'})


export const SortColorSchema= z.enum(['codigoColor','-codigoColor','nombreColor','-nombreColor'],{message:"Solo acepta los siguientes parámetros:'codigoColor','-codigoColor','nombreColor','-nombreColor'"})

export const SortCategoriaSchema = z.enum(['ordenEnMenu','-ordenEnMenu','nombreCategoria','-nombreCategoria','tipoCategoria','-tipoCategoria'],{message:"Solo acepta los siguientes parámetros:'ordenEnMenu','-ordenEnMenu','nombreCategoria','-nombreCategoria','tipoCategoria','-tipoCategoria'"})


