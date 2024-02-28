import { Request, Response } from "express";
import InvoiceModel from "../models/Invoice.model";
import { generateId } from "../services/helper";

export const createInvoice = (req: any, res: Response) => {
  const generateid = generateId();

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
    posterId: req.user.id,
    status: "pending",
    invoiceId: generateid,
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

export const getOneInvoice = (req: Request, res: Response) => {
  const id = req.params.id;

  InvoiceModel.findById(id)
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

export const updateInvoice = (req: Request, res: Response) => {
  const id = req.params.id;
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
    status,
  } = req.body;
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
  InvoiceModel.findByIdAndUpdate(id, invoiceData)
    .then(() => {
      res.status(200).json({ message: "Successfully Updated", invoiceId: id });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error updating Invoice",
      });
    });
};

export const deleteInvoice = (req: Request, res: Response) => {
  const id = req.params.id;
  InvoiceModel.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: "Successfully deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error", error });
    });
};

export const getCurrentUserInvoices = async (req: any, res: Response) => {
  const id = req.user.id;
  try {
    const invoices = await InvoiceModel.find({ posterId: id });
    res.status(200).json({ message: "User invoices Retrieved", invoices });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch Invoices" });
  }
};
