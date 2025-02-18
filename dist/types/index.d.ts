import { Document } from "mongoose";
export type ColorType = Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigoColor: string;
    nombreColor: string;
}>;
export type CategoriaType = Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    codigoCategoria: string;
    nombreCategoria: string;
    descripcionCategoria: string;
    tipoCategoria: 'Mercadería Reventa' | 'Ingreso Contable' | 'Egreso Contable';
    ordenEnMenu: number;
    validaActualmente: 'on' | 'off';
    imagenCategoria: string;
    carpetaFotos: string;
}>;
