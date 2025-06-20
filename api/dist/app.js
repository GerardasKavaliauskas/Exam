"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const authAPI_1 = __importDefault(require("./routes/authAPI"));
const api_v1_1 = __importDefault(require("./routes/api_v1"));
const app = (0, express_1.default)();
const client_1 = require("@prisma/client");
const prismaDb = new client_1.PrismaClient();
// -- // -- // -- // -- //
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/', authAPI_1.default);
app.use('/api/v1/', api_v1_1.default);
app.listen(3000); // process.env.SERVER_PORT ?
exports.default = prismaDb;
