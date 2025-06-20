"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = __importDefault(require("../app"));
// -- // -- // -- // -- //
async function getAllUsers(_, res) {
    try {
        const users = await app_1.default.user.findMany({
            select: { password: false }
        });
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json('Serverio klaida');
    }
    ;
}
;
async function getUser(req, res) {
    try {
        const user = await app_1.default.user.findFirst({
            where: { id: Number(req.params.id) },
            select: { password: false }
        });
        if (!user) {
            res.status(404).json('Vartotojas nerastas');
            return;
        }
        ;
        res.status(200).json(user);
    }
    catch {
        res.status(500).json('Serverio klaida');
    }
    ;
}
;
async function deleteUser(req, res) {
    try {
        const user = await app_1.default.user.findFirst({
            where: { id: Number(req.params.id) }
        });
        if (!user) {
            res.status(404).json('Vartotojas nerastas');
            return;
        }
        ;
        //
        const result = await app_1.default.user.delete({
            where: { id: user.id }
        });
        if (!result) {
            res.status(500).json('Serverio klaida');
            return;
        }
        ;
        res.status(200).json('Vartotojas ištrintas');
    }
    catch {
        res.status(500).json('Serverio klaida');
    }
    ;
}
;
async function updateUser(req, res) {
    try {
        const user = await app_1.default.user.findFirst({
            where: { id: Number(req.params.id) }
        });
        if (!user) {
            res.status(404).json('Vartotojas nerastas');
            return;
        }
        ;
        //
        const validation = (0, express_validator_1.validationResult)(req);
        if (!validation.isEmpty()) {
            res.status(400).json(validation.array());
            return;
        }
        ;
        const data = (0, express_validator_1.matchedData)(req);
        //
        const email = await app_1.default.user.findFirst({
            where: { email: data.email },
        });
        if (email && email.email !== user.email) {
            res.status(400).json('Toks el. pašto adresas jau egzistuoja');
            return;
        }
        ;
        if (data.password)
            data.password = await bcrypt_1.default.hash(data.password, 10);
        //
        const result = await app_1.default.user.update({
            where: { id: user.id },
            data: data,
        });
        if (!result) {
            res.status(500).json('Serverio klaida');
            return;
        }
        ;
        res.status(200).json('Vartotojas atnaujintas');
    }
    catch {
        res.status(500).json('Serverio klaida');
    }
    ;
}
;
async function storeUser(req, res) {
    try {
        const validation = (0, express_validator_1.validationResult)(req);
        if (!validation.isEmpty()) {
            res.status(400).json(validation.array());
            return;
        }
        ;
        const reqData = (0, express_validator_1.matchedData)(req);
        //
        let user = await app_1.default.user.findFirst({
            where: { email: reqData.email },
        });
        if (user) {
            res.status(400).json('Toks el. pašto adresas jau egzistuoja');
            return;
        }
        ;
        reqData.password = await bcrypt_1.default.hash(reqData.password, 10);
        //
        user = await app_1.default.user.create({ data: reqData });
        if (!user) {
            res.status(500).json('Serverio klaida');
            return;
        }
        ;
        res.status(201).json({
            message: 'Vartotojas sukurtas',
            id: user.id
        });
    }
    catch {
        res.status(500).json('Serverio klaida');
    }
    ;
}
;
// -- // -- // -- // -- //
const validateStore = () => [
    (0, express_validator_1.body)('email')
        .trim()
        .notEmpty()
        .withMessage('El. pašto adresas yra privalomas')
        .escape()
        .isEmail()
        .withMessage('Neteisingas vartotojo el. pašto adresas'),
    (0, express_validator_1.body)('password')
        .trim()
        .notEmpty()
        .withMessage('Slaptažodis yra privalomas')
        .escape()
];
const validateUpdate = () => [
    (0, express_validator_1.body)('email')
        .trim()
        .notEmpty()
        .withMessage('El. pašto adresas yra privalomas')
        .escape()
        .isEmail()
        .withMessage('Neteisingas vartotojo el. pašto adresas'),
    (0, express_validator_1.body)('password').trim().optional().escape(),
    (0, express_validator_1.body)('status')
        .trim()
        .escape()
        .isInt()
        .withMessage('Būsenos numeris yra privalomas'),
    (0, express_validator_1.body)('role').trim().escape().isInt().withMessage('Rolės numeris yra privalomas')
];
// -- // -- // -- // -- //
exports.default = {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    storeUser,
    validateStore,
    validateUpdate
};
