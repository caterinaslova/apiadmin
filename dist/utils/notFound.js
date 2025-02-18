"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = (req, res) => {
    res.status(404).json({ mensaje: 'Pagina no encontrada' });
};
exports.notFound = notFound;
//# sourceMappingURL=notFound.js.map