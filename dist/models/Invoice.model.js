"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema for the document
const invoiceSchema = new mongoose_1.Schema({
    streetAddress: { type: String, required: true },
    billerCity: { type: String, required: true },
    postCode: { type: String, required: true },
    billerCountry: { type: String },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientAddress: { type: String, required: true },
    clientCity: { type: String, required: true },
    clientPostCode: { type: String, required: true },
    clientCountry: { type: String, required: true },
    invoiceDate: { type: String, required: true },
    paymentTerm: { type: String, required: true },
    projectDescription: { type: String, required: true },
    posterId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, required: true },
    invoiceId: { type: String, required: true },
    itemPrice: [
        {
            itemName: { type: String, required: true },
            price: { type: String, required: true },
            quantity: { type: String, required: true },
            id: { type: String, required: true },
            total: { type: String, required: true },
        },
    ],
}, { timestamps: true });
// Create and export the model
const InvoiceModel = mongoose_1.default.model("Invoice", invoiceSchema);
exports.default = InvoiceModel;
