import { Request, Response, NextFunction } from "express";
import { CategoriaType } from "../types";
declare global {
    namespace Express {
        interface Request {
            categoria?: CategoriaType & {
                codigoCategoria: string;
                nombreCategoria: string;
                descripcionCategoria: string;
                tipoCategoria: 'Mercadería Reventa' | 'Ingreso Contable' | 'Egreso Contable';
                ordenEnMenu: number;
                validaActualmente: 'on' | 'off';
                imagenCategoria: string;
                carpetaFotos: string;
            };
        }
    }
}
export declare const validateCategoriasInputs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const validateCategoriaExists: (req: Request, res: Response, next: NextFunction) => Promise<void>;
