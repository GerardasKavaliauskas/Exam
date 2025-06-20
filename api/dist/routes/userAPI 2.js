"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const AuthAPIController_1 = __importDefault(require("../controllers/AuthAPIController"));
const UserAPIController_1 = __importDefault(require("../controllers/UserAPIController"));
// -- // -- // -- // -- //
router.get('/user/all', AuthAPIController_1.default.isAdmin, UserAPIController_1.default.getAllUsers);
router.get('/user/:id', AuthAPIController_1.default.isAuth, UserAPIController_1.default.getUser);
router.post('/user/all', AuthAPIController_1.default.isAdmin, UserAPIController_1.default.validateStore(), UserAPIController_1.default.storeUser);
router.put('/user/:id', AuthAPIController_1.default.isAdmin, UserAPIController_1.default.validateUpdate(), UserAPIController_1.default.updateUser);
router.delete('/user/:id', AuthAPIController_1.default.isAdmin, UserAPIController_1.default.deleteUser);
exports.default = router;
