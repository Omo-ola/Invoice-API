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
exports.getCurrentUserInvoices = exports.deleteInvoice = exports.updateInvoice = exports.getOneInvoice = exports.getAllInvoice = exports.createInvoice = void 0;
const Invoice_model_1 = __importDefault(require("../models/Invoice.model"));
const helper_1 = require("../services/helper");
const createInvoice = (req, res) => {
    const generateid = (0, helper_1.generateId)();
    const { streetAddress, billerCity, postCode, billerCountry, clientName, clientEmail, clientAddress, clientCity, clientPostCode, clientCountry, invoiceDate, paymentTerm, projectDescription, itemPrice, } = req.body;
    const productData = {
        streetAddress,
        billerCity,
        postCode,
        billerCountry,
        clientName,
        clientEmail,
        clientAddress,
        clientCity,
        clientPostCode,
        clientCountry,
        invoiceDate,
        paymentTerm,
        projectDescription,
        itemPrice,
        posterId: req.user.id,
        status: "pending",
        invoiceId: generateid,
    };
    if (!streetAddress ||
        !billerCity ||
        !postCode ||
        !billerCountry ||
        !clientName ||
        !clientEmail ||
        !clientAddress ||
        !clientCity ||
        !clientPostCode ||
        !clientCountry ||
        !invoiceDate ||
        !paymentTerm ||
        !projectDescription ||
        itemPrice.length <= 0) {
        return res
            .status(400)
            .json({ message: "Some required fields are not satisfied" });
    }
    Invoice_model_1.default.create(productData)
        .then((product) => {
        res.status(201).json({ status: "Successful", productId: product._id });
    })
        .catch((err) => {
        res.status(500).json({ message: "Server is down please try again" });
    });
};
exports.createInvoice = createInvoice;
const getAllInvoice = (req, res) => {
    Invoice_model_1.default.find({})
        .then((invoices) => {
        res
            .status(200)
            .json({ message: "All invoices successfully fetched", invoices });
    })
        .catch((error) => res.status(500).json({ message: "Error please try again", error }));
};
exports.getAllInvoice = getAllInvoice;
const getOneInvoice = (req, res) => {
    const id = req.params.id;
    Invoice_model_1.default.findById(id)
        .then((invoice) => {
        res.status(200).json({
            message: "Successfully",
            invoice,
        });
    })
        .catch((error) => {
        res.status(500).json({ message: "Error please try again", error });
    });
};
exports.getOneInvoice = getOneInvoice;
const updateInvoice = (req, res) => {
    const id = req.params.id;
    const { streetAddress, billerCity, postCode, billerCountry, clientName, clientEmail, clientAddress, clientCity, clientPostCode, clientCountry, invoiceDate, paymentTerm, projectDescription, itemPrice, status, } = req.body;
    const invoiceData = {
        streetAddress,
        billerCity,
        postCode,
        billerCountry,
        clientName,
        clientEmail,
        clientAddress,
        clientCity,
        clientPostCode,
        clientCountry,
        invoiceDate,
        paymentTerm,
        projectDescription,
        itemPrice,
        status,
    };
    Invoice_model_1.default.findByIdAndUpdate(id, invoiceData)
        .then(() => {
        res.status(200).json({ message: "Successfully Updated", invoiceId: id });
    })
        .catch((error) => {
        res.status(500).json({
            message: "Error updating Invoice",
        });
    });
};
exports.updateInvoice = updateInvoice;
const deleteInvoice = (req, res) => {
    const id = req.params.id;
    Invoice_model_1.default.findByIdAndDelete(id)
        .then(() => {
        res.status(200).json({ message: "Successfully deleted" });
    })
        .catch((error) => {
        res.status(500).json({ message: "Error", error });
    });
};
exports.deleteInvoice = deleteInvoice;
const getCurrentUserInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    try {
        const invoices = yield Invoice_model_1.default.find({ posterId: id });
        res.status(200).json({ message: "User invoices Retrieved", invoices });
    }
    catch (error) {
        res.status(500).json({ message: "Unable to fetch Invoices" });
    }
});
exports.getCurrentUserInvoices = getCurrentUserInvoices;
