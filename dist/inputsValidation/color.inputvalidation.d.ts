import { Request, Response, NextFunction } from "express";
import { ColorType } from "../types";
declare global {
    namespace Express {
        interface Request {
            color?: ColorType & {
                codigoColor: string;
                nombreColor: string;
            };
        }
    }
}
export declare const validateColorInputs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const validateColorExists: (req: Request, res: Response, next: NextFunction) => Promise<void>;
