"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthenticatedError = exports.NotFoundError = exports.BadRequestError = exports.CustomAPIError = void 0;
const http_status_codes_1 = require("http-status-codes");
class CustomAPIError extends Error {
    mensaje;
    statusCode;
    constructor(mensaje) {
        super(mensaje);
        this.mensaje = mensaje;
        this.statusCode = http_status_codes_1.StatusCodes.CONFLICT;
    }
}
exports.CustomAPIError = CustomAPIError;
class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
}
exports.NotFoundError = NotFoundError;
class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
class UnauthorizedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.FORBIDDEN;
    }
}
//# sourceMappingURL=index.js.map