"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const handleErrors_1 = require("./utils/handleErrors");
const notFound_1 = require("./utils/notFound");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// routes
const colores_router_1 = __importDefault(require("./routes/colores.router"));
const categorias_router_1 = __importDefault(require("./routes/categorias.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '10mb' }));
app.use((0, express_fileupload_1.default)());
app.use(express_1.default.static('./public'));
app.use('/api/colores', colores_router_1.default);
app.use('/api/categorias', categorias_router_1.default);
(0, db_1.conectarBD)(process.env.DATABASE_URL);
app.use(handleErrors_1.handleErrors);
app.use(notFound_1.notFound);
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`La app está escuchando en el puerto ${port}`));
//# sourceMappingURL=index.js.map