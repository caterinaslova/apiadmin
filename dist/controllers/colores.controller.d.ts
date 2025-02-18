import type { NextFunction, Request, Response } from 'express';
export declare class ColorController {
    static createColor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static getAllColor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static getColor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static updateColor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    static deleteColor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
