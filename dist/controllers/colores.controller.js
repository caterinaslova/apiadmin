"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorController = void 0;
const color_modelo_1 = __importDefault(require("../models/color.modelo"));
const schemas_1 = require("../schemas");
const zod_1 = require("zod");
const errors_1 = require("../errors");
const PRODUCTS_PER_PAGE = Number(process.env.PRODUCTS_PER_PAGE);
class ColorController {
    static createColor = async (req, res, next) => {
        try {
            const { codigoColor, nombreColor } = req.body;
            const color = new color_modelo_1.default;
            color.codigoColor = codigoColor.toLowerCase();
            color.nombreColor = nombreColor.toLowerCase();
            await color.save();
            res.status(201).json({ mensaje: 'Color agregado correctamente' });
        }
        catch (error) {
            next(error);
        }
    };
    static getAllColor = async (req, res, next) => {
        let search = "";
        let sort = "nombreColor";
        try {
            if (req.query.search) {
                search = schemas_1.SearchSchema.parse(req.query.search);
            }
            if (req.query.sort) {
                sort = schemas_1.SortColorSchema.parse(req.query.sort);
            }
            let resultado = await color_modelo_1.default.find({ $or: [{ nombreColor: { $regex: search, $options: 'i' } }, { codigoColor: { $regex: search, $options: 'i' } }] }).sort({ "nombreColor": 1 });
            if (sort && sort === "-codigoColor") {
                resultado = resultado.sort((a, b) => {
                    if (a.codigoColor.toLowerCase() < b.codigoColor.toLowerCase()) {
                        return 1;
                    }
                    if (a.codigoColor.toLowerCase() > b.codigoColor.toLowerCase()) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
            }
            if (sort && sort === "nombreColor") {
                resultado = resultado.sort((a, b) => {
                    if (a.nombreColor.toLowerCase() > b.nombreColor.toLowerCase()) {
                        return 1;
                    }
                    if (a.nombreColor.toLowerCase() < b.nombreColor.toLowerCase()) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
            }
            if (sort && sort === "-nombreColor") {
                resultado = resultado.sort((a, b) => {
                    if (a.nombreColor.toLowerCase() < b.nombreColor.toLowerCase()) {
                        return 1;
                    }
                    if (a.nombreColor.toLowerCase() > b.nombreColor.toLowerCase()) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });
            }
            const totalItems = resultado.length;
            let page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || PRODUCTS_PER_PAGE;
            const ultimaPage = Math.ceil(totalItems / limit);
            if (page < 1)
                page = 1;
            if (page > ultimaPage)
                page = ultimaPage;
            const skip = (page - 1) * limit;
            const ultimoRegistro = skip + limit;
            const resultadoLimitado = resultado.filter((item, index) => {
                if (index > skip - 1) {
                    if (index < ultimoRegistro) {
                        return item;
                    }
                }
            });
            res.status(200).json({
                datos: resultadoLimitado,
                metadatos: {
                    total: totalItems,
                    paginas: ultimaPage,
                    actual: page,
                    paginacion: limit
                }
            });
        }
        catch (error) {
            let errorProducido = new errors_1.BadRequestError(error);
            if (zod_1.ZodError) {
                const errors = error.errors.map(error => error.message).join(". ");
                errorProducido = new errors_1.BadRequestError(errors);
            }
            next(errorProducido);
        }
    };
    static getColor = async (req, res, next) => {
        try {
            res.status(200).json(req.color);
        }
        catch (error) {
            next(error);
        }
    };
    static updateColor = async (req, res, next) => {
        try {
            const { nombreColor, codigoColor } = req.body;
            const color = await color_modelo_1.default.findOneAndUpdate(req.color._id, {
                codigoColor: codigoColor.toLowerCase(),
                nombreColor: nombreColor.toLowerCase()
            }, { new: true }).select('-__v');
            res.status(200).json({ mensaje: 'Color modificado correctamente' });
        }
        catch (error) {
            next(error);
        }
    };
    static deleteColor = async (req, res, next) => {
        try {
            await color_modelo_1.default.deleteOne({ _id: req.color._id });
            res.status(200).json({ mensaje: `El color  ${req.color.nombreColor} ha sido eliminado.` });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.ColorController = ColorController;
//# sourceMappingURL=colores.controller.js.map