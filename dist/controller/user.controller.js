"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteUser = exports.updateUser = exports.getAuthUser = exports.getOneUser = exports.getAllUser = exports.createUser = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    User_model_1.default.findOne({ email }).then((user) => {
        if (user) {
            return res.status(400).json({ message: "User with email already exist" });
        }
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const userData = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            isAdmin: false,
        };
        User_model_1.default.create(userData)
            .then((user) => {
            res.status(200).json({ message: "Successful", userId: user._id });
        })
            .catch((error) => {
            res.status(500).json({ message: "Error try again", error });
        });
    });
};
exports.createUser = createUser;
const getAllUser = (req, res) => {
    User_model_1.default.find({})
        .then((users) => {
        res.status(200).json({ message: "User retrieved successfully", users });
    })
        .catch((error) => {
        res.status(500).json({ message: "Error retrieving,try again", error });
    });
};
exports.getAllUser = getAllUser;
const getOneUser = (req, res) => {
    const userId = req.params.id;
    User_model_1.default.findById(userId)
        .then((user) => {
        res.status(200).json({ message: "User retrieved", user });
    })
        .catch((error) => {
        res.status(500).json({ message: "Error, Try again", error });
    });
};
exports.getOneUser = getOneUser;
//  To get this route , provide Authorization token in the header
const getAuthUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_1.default.findById(req.user.id).select("-password");
        res.json({
            status: "success",
            data: user,
        });
    }
    catch (error) {
        res.status(403).send({ message: "Authentication needed" });
    }
});
exports.getAuthUser = getAuthUser;
const updateUser = (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    const userData = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isAdmin: false,
    };
    User_model_1.default.findByIdAndUpdate(userId, userData)
        .then(() => {
        res.status(200).json({ message: "Successfully updated", userId });
    })
        .catch((error) => {
        res.status(500).json({ message: "Error, Try again", error });
    });
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const userId = req.params.id;
    User_model_1.default.findByIdAndDelete(userId)
        .then(() => {
        res.status(200).json({ message: "Successfully deleted" });
    })
        .catch((error) => {
        res.status(500).json({ message: "Error,Try again", error });
    });
};
exports.deleteUser = deleteUser;
const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    User_model_1.default.findOne({ email })
        .then((user) => {
        if (!user) {
            return res.status(400).json({ message: "User with email not found" });
        }
        else if (!bcrypt_1.default.compareSync(password, user.password)) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, `${process.env.JWT_SECRET}`);
        const isAdminToken = jsonwebtoken_1.default.sign({ isAdmin: user.isAdmin }, `${process.env.JWT_SECRET}`);
        if (user.isAdmin === true)
            return res.status(200).json({
                message: "User found",
                data: { token, isAdminToken, userId: user._id },
            });
        return res.status(200).json({
            message: "User found",
            data: { token, userId: user._id },
        });
    })
        .catch((error) => {
        return res
            .status(500)
            .json({ message: "Error login in,Try again", error });
    });
};
exports.login = login;
