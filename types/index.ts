export type Order = {
    orderId: string;
    product: string;
    price: string;
    paymentMethod: string;
    date: string;
    status: "Processing" | "Completed";
  };