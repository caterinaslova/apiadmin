"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortCategoriaSchema = exports.SortColorSchema = exports.SearchSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SearchSchema = zod_1.default.string({ message: 'Solo puede ser un string' });
exports.SortColorSchema = zod_1.default.enum(['codigoColor', '-codigoColor', 'nombreColor', '-nombreColor'], { message: "Solo acepta los siguientes parámetros:'codigoColor','-codigoColor','nombreColor','-nombreColor'" });
exports.SortCategoriaSchema = zod_1.default.enum(['ordenEnMenu', '-ordenEnMenu', 'nombreCategoria', '-nombreCategoria', 'tipoCategoria', '-tipoCategoria'], { message: "Solo acepta los siguientes parámetros:'ordenEnMenu','-ordenEnMenu','nombreCategoria','-nombreCategoria','tipoCategoria','-tipoCategoria'" });
//# sourceMappingURL=index.js.map