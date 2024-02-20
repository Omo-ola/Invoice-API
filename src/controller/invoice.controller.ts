import { Request, Response } from "express";
import InvoiceModel from "../models/Invoice.model";

export const createInvoice = (req: Request, res: Response) => {
  const {
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
  } = req.body;
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
  };
  if (
    !streetAddress ||
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
    itemPrice.length <= 0
  ) {
    return res
      .status(400)
      .json({ message: "Some required fields are not satisfied" });
  }

  InvoiceModel.create(productData)
    .then((product) => {
      res.status(201).json({ status: "Successful", productId: product._id });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server is down please try again" });
    });
};

export const getAllInvoice = (req: Request, res: Response) => {
  InvoiceModel.find({})
    .then((invoices) => {
      res
        .status(200)
        .json({ message: "All invoices successfully fetched", invoices });
    })
    .catch((error) =>
      res.status(500).json({ message: "Error please try again", error })
    );
};
