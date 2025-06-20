"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthAPIController_1 = __importDefault(require("../controllers/AuthAPIController"));
const UserAPIController_1 = __importDefault(require("../controllers/UserAPIController"));
const router = express_1.default.Router();
// POST: /register, /login
// -- // -- // -- // -- //
router.post('/register', UserAPIController_1.default.validateStore(), UserAPIController_1.default.storeUser);
router.post('/login', AuthAPIController_1.default.validateLogin(), AuthAPIController_1.default.login);
exports.default = router;
