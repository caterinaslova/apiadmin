"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categoriaSchema = new mongoose_1.Schema({
    codigoCategoria: {
        type: String,
        unique: true,
        required: true
    },
    nombreCategoria: {
        type: String,
        unique: true,
        required: true
    },
    descripcionCategoria: {
        type: String,
        required: true
    },
    tipoCategoria: {
        type: String,
        enum: { values: ['Mercadería Reventa', 'Ingreso Contable', 'Egreso Contable'], message: '{VALUE} no es válido.' },
        required: true
    },
    ordenEnMenu: {
        type: Number,
        required: true
    },
    validaActualmente: {
        type: String,
        enum: { values: ['on', 'off'], message: '{VALUE} no es válido.' },
        default: 'on'
    },
    imagenCategoria: {
        type: String,
        default: 'imagen01.jpg'
    },
    carpetaFotos: {
        type: String,
        default: 'capeta01'
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Categoria', categoriaSchema);
//# sourceMappingURL=categoria.modelo.js.map