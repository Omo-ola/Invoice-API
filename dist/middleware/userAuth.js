"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token)
        return res.status(403).json({ message: "Access denied" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Invalid token supplied" });
    }
};
exports.auth = auth;
