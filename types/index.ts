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

export interface Thumbnail {
  id: string;
  url: string;
  _id: string;

}

export interface category {
  _id: string;
  name: string;
  thumbnail: Thumbnail;

}

export type ProductImage = {
  url: string;
  id: string;
  _id: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: ProductImage[];
  thumbnail: string;
  categoryName: string;
};


export type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: ProductImage[];
  thumbnail: string;
  categoryName: string;
  cartQuantity: number;
};

export interface CartType {
  cartItems: CartItem[]; // An array of CartItems
  cartTotalQuantity: number; // Total number of items in the cart
  cartTotalAmount: number; // Total amount of the cart
}



// types.ts
export interface UserData {
  id: string;
  // name: string;
  email: string;
  // phone: string;
  // address: string;
  role: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userData: UserData | null;
}

export interface RootState {
  auth: AuthState; // Add other slices here as needed
}

export interface favoriteItems {
  favoriteItems: Product[];
}

export interface FavoritesState {
  favorites: favoriteItems;
}
