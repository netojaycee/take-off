export type Order = {
  orderId: string;
  product: string;
  price: string;
  paymentMethod: string;
  date: string;
  status: "Processing" | "Completed";
};

export interface register {
  name: string;
  email: string;
  password: string;
}


// types.ts
export interface UserData {
  id: string;
  // name: string;
  email: string;
  // phone: string;
  // address: string;
  // role: string[];
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userData: UserData | null;
}

export interface RootState {
  auth: AuthState; // Add other slices here as needed
}
