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
  status: string;
  invoiceId: string;
  itemPrice: Array<{
    itemName: string;
    price: string;
    quantity: string;
    id: string;
    total: number;
  }>;
}

export interface Iuser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
