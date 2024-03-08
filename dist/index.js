"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const invoice_controller_1 = require("./controller/invoice.controller");
const user_controller_1 = require("./controller/user.controller");
const userAuth_1 = require("./middleware/userAuth");
const app = (0, express_1.default)();
const URI = process.env.MONGODB_URI;
mongoose_1.default
    .connect(`${URI}`)
    .then((res) => {
    console.log("Connected successfully");
})
    .catch((err) => console.log("Error connecting == ", err.message));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.json({ message: "Homepage" });
});
// Invoice Routes
app.post("/api/invoices", userAuth_1.auth, invoice_controller_1.createInvoice);
app.get("/api/invoices/:id", invoice_controller_1.getOneInvoice);
app.get("/api/invoices", invoice_controller_1.getAllInvoice);
app.put("/api/invoices/:id", userAuth_1.auth, invoice_controller_1.updateInvoice);
app.delete("/api/invoices/:id", userAuth_1.auth, invoice_controller_1.deleteInvoice);
app.get("/api/user/invoices/:id", userAuth_1.auth, invoice_controller_1.getCurrentUserInvoices);
// User Routes
app.post("/api/user", user_controller_1.createUser);
app.post("/api/login", user_controller_1.login);
app.get("/api/user/auth", userAuth_1.auth, user_controller_1.getAuthUser);
app.get("/api/user/:id", user_controller_1.getOneUser);
app.get("/api/user", user_controller_1.getAllUser);
app.put("/api/user/:id", user_controller_1.updateUser);
app.delete("/api/user/:id", user_controller_1.deleteUser);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
