"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthAPIController_1 = __importDefault(require("../controllers/AuthAPIController"));
const UserAPIController_1 = __importDefault(require("../controllers/UserAPIController"));
const router = express_1.default.Router();
// -- // -- // -- // -- //
router.get('/', AuthAPIController_1.default.isAdmin, UserAPIController_1.default.getAllUsers);
router.get('/:id', AuthAPIController_1.default.isAuth, UserAPIController_1.default.getUser);
router.post('/', AuthAPIController_1.default.isAdmin, UserAPIController_1.default.validateStore(), UserAPIController_1.default.storeUser);
router.put('/:id', AuthAPIController_1.default.isAdmin, UserAPIController_1.default.validateUpdate(), UserAPIController_1.default.updateUser);
router.delete('/:id', AuthAPIController_1.default.isAdmin, UserAPIController_1.default.deleteUser);
exports.default = router;
