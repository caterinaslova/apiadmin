import { Request, Response, NextFunction } from "express";
export declare class CategoriaController {
    static createCategoria: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static getAllCategoria: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static getCategoria: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static updateCategoria: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static deleteCategoria: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static uploadImageCategoria: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
