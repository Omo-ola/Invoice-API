export interface IProduct extends Document {
  streetAddress: string;
  billerCity: string;
  postCode: string;
  billerCountry: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  clientCity: string;
  clientPostCode: string;
  clientCountry: string;
  invoiceDate: string;
  paymentTerm: string;
  projectDescription: string;
  itemPrice: Array<{
    itemName: string;
    price: string;
    quantity: string;
    id: string;
  }>;
}
