import bodyParser from "body-parser";
import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors"
import {
  createInvoice,
  deleteInvoice,
  getAllInvoice,
  getOneInvoice,
  updateInvoice,
} from "./controller/invoice.controller";
import {
  createUser,
  deleteUser,
  getAllUser,
  getAuthUser,
  getOneUser,
  login,
  updateUser,
} from "./controller/user.controller";
import { auth } from "./middleware/userAuth";

const app = express();
const URI = process.env.MONGODB_URI;

mongoose
  .connect(`${URI}`)
  .then((res) => {
    console.log("Connected successfully");
  })
  .catch((err) => console.log("Error connecting == ", err.message));

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Homepage" });
});

// Invoice Routes
app.post("/api/invoices", createInvoice);
app.get("/api/invoices/:id", getOneInvoice);
app.get("/api/invoices", getAllInvoice);
app.put("/api/invoices/:id", updateInvoice);
app.delete("/api/invoices/:id", deleteInvoice);

// User Routes

app.post("/api/user", createUser);
app.post("/api/login", login);
app.get("/api/user/auth", auth, getAuthUser);

app.get("/api/user/:id", getOneUser);
app.get("/api/user", getAllUser);

app.put("/api/user/:id", updateUser);


app.delete("/api/user/:id", deleteUser);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
