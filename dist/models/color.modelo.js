"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ColorSchema = new mongoose_1.Schema({
    codigoColor: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    nombreColor: {
        type: String,
        required: true,
        lowercase: true
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Color', ColorSchema);
//# sourceMappingURL=color.modelo.js.map