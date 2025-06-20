"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_1 = __importDefault(require("../app"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("../passport"));
const JWT_SECRET = process.env.JWT_SECRET ?? '';
// -- // -- // -- // -- //
async function login(req, res) {
    const validation = (0, express_validator_1.validationResult)(req);
    if (!validation.isEmpty()) {
        res.status(400).json(validation.array());
        return;
    }
    ;
    //
    const reqData = (0, express_validator_1.matchedData)(req);
    const user = await app_1.default.user.findFirst({
        where: { email: reqData.email },
    });
    if (!user) {
        res.status(401).json('Neteisingi prisijungimo duomenys');
        return;
    }
    ;
    //
    if (!await bcrypt_1.default.compare(reqData.password, user.password)) {
        res.status(401).json('Neteisingi prisijungimo duomenys');
        return;
    }
    ;
    const token = jsonwebtoken_1.default.sign({
        userId: user.id
    }, JWT_SECRET, {
        expiresIn: '1h',
    });
    const userData = { ...user };
    delete userData.password;
    res.status(200).json({
        message: 'Prisijungta prie sistemos',
        user: userData,
        token
    });
}
;
async function auth(req, res, next, admin) {
    passport_1.default.authenticate('jwt', {
        session: false
    }, function (_, user) {
        if (user && (admin ? user.role === 2 : true)) {
            req.user = user;
            return next();
        }
        ;
        res.status(401).json('Neautorizuota');
    })(req, res, next);
}
;
const isAuth = (req, res, next) => auth(req, res, next, false);
const isAdmin = (req, res, next) => auth(req, res, next, true);
// -- // -- // -- // -- //
const validateLogin = () => {
    return [
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
            .escape(),
    ];
};
// -- // -- // -- // -- //
exports.default = {
    login,
    isAuth,
    isAdmin,
    validateLogin
};
