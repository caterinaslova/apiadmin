import { StatusCodes } from "http-status-codes";
export declare class CustomAPIError extends Error {
    mensaje: string;
    statusCode: StatusCodes;
    constructor(mensaje: string);
}
export declare class BadRequestError extends CustomAPIError {
    constructor(message: string);
}
export declare class NotFoundError extends CustomAPIError {
    constructor(message: string);
}
export declare class UnauthenticatedError extends CustomAPIError {
    constructor(message: string);
}
