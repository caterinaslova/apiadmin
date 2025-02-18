import { StatusCodes } from "http-status-codes";
export class CustomAPIError extends Error {
    mensaje: string;
    statusCode:StatusCodes;
    constructor(mensaje:string) {
      super(mensaje)
      this.mensaje=mensaje
      this.statusCode= StatusCodes.CONFLICT
      
    }
  }

 export class BadRequestError extends CustomAPIError {
    constructor(message:string) {
      super(message);
     this.statusCode = StatusCodes.BAD_REQUEST;
    }
  }

  export class NotFoundError extends CustomAPIError {
    constructor(message:string) {
      super(message);
      this.statusCode = StatusCodes.NOT_FOUND;
    }
  }
  export class UnauthenticatedError extends CustomAPIError {
    constructor(message:string) {
      super(message);
      this.statusCode = StatusCodes.UNAUTHORIZED;
    }
  }
  class UnauthorizedError extends CustomAPIError {
    constructor(message:string) {
      super(message);
      this.statusCode = StatusCodes.FORBIDDEN;
    }
  }