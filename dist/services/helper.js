"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
const uuid_1 = require("uuid");
function generateId() {
    return (0, uuid_1.v4)().substring(0, 7).toUpperCase(); // Substring to get the first 7 characters and convert to uppercase
}
exports.generateId = generateId;
