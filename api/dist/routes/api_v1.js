"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAPI_1 = __importDefault(require("./userAPI"));
const eventAPI_1 = __importDefault(require("./eventAPI"));
// import rateRouter from './rateAPI';
// import postRouter from './postAPI';
// import messageRouter from './messageAPI';
// import tagRouter from './tagAPI';
const router = express_1.default.Router();
// -- // -- // -- // -- //
router.use('/users/', userAPI_1.default);
router.use('/events/', eventAPI_1.default);
// router.use('/rates/', rateRouter);
// router.use('/posts/', postRouter);
// router.use('/messages/', messageRouter);
// router.use('/tags/', tagRouter);
exports.default = router;
// -- // -- // -- // -- //
// USERS
// GET: /users, /users/:id
// POST: /users
// PUT: /users/:id
// DELETE: /users/:id
