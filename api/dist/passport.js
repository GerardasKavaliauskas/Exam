"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const app_1 = __importDefault(require("./app"));
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || "",
    // issuer: "accounts.examplesoft.com", // domenas env
    // audience: "yoursite.net", // domenas irgi env
};
passport_1.default.use(new passport_jwt_1.Strategy(opts, async function (jwt_payload, done) {
    try {
        const user = await app_1.default.user.findFirst({
            where: { id: jwt_payload.userid },
            omit: { password: true },
        });
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    catch (err) {
        return done(err, false); // todo: Pasalinti error isvedima
    }
}));
exports.default = passport_1.default;
