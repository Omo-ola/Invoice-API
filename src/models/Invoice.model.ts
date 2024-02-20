import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types/Interface";

// Define the schema for the document
const invoiceSchema: Schema = new Schema(
  {
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
    itemPrice: [
      {
        itemName: { type: String, required: true },
        price: { type: String, required: true },
        quantity: { type: String, required: true },
        id: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Create and export the model
const InvoiceModel = mongoose.model<IProduct>("Product", invoiceSchema);
export default InvoiceModel;
