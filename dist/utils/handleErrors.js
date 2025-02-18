"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const http_status_codes_1 = require("http-status-codes");
const handleErrors = (error, req, res, next) => {
    let mensajeError = error.message;
    let customError = {
        // set default
        statusCode: error.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || 'Hubo un error. Consulte con el programador',
    };
    if (error.errorResponse && error.errorResponse.code === 11000) {
        customError.message = `'Los códigos/nombres no pueden repetirse'`;
        customError.statusCode = 400;
    }
    if (error.status === 400 && error.type === 'entity.parse.failed') {
        customError.message = "Error en el Json con el que se ingresaron los datos";
        customError.statusCode = 400;
    }
    // console.log(error)
    res.status(customError.statusCode).json({ mensaje: customError.message });
    return;
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=handleErrors.js.map