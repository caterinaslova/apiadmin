"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectarBD = void 0;
const mongoose_1 = require("mongoose");
const conectarBD = async (stringConexion) => {
    try {
        await (0, mongoose_1.connect)(stringConexion);
        console.log('Base de datos conectada');
    }
    catch (error) {
        console.log('Error al conectar la base de datos:', error.message);
        process.exit(1);
    }
};
exports.conectarBD = conectarBD;
//# sourceMappingURL=db.js.map