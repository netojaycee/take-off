
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
  inStock: boolean;
  categoryId: category;
  seller: string;
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
  inStock: boolean;
  categoryId: category;
  cartQuantity: number;
  seller: string;
};



export interface CartType {
  cartItems: CartItem[]; // An array of CartItems
  cartTotalQuantity: number; // Total number of items in the cart
  cartTotalAmount: number; // Total amount of the cart
}



// types.ts
export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  image: string;
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


// interface CartItem {
//   id: string;
//   name: string;
//   quantity: number;
//   thumbnail: string;
// }
export interface Reviews {
  image: string;
  user: string;
  rating: number;
  content: string;
}

// export interface Order {
//   id: string;
//   user: string;
//   name: string;
//   mobile: string;
//   email: string;
//   address: string;
//   paymentReference: string;
//   paymentStatus: string;
//   deliveryStatus: string;
//   note: string;
//   price: number;
//   paidAt: string; // Date as a string
//   cartItems: CartItem[];
// }

export interface Order {
  id: string;
  orderNumber: string;
  buyer: Buyer;
  seller: { id: string; name: string; email: string };
  product: Product;
  quantity: number;
  totalPrice: number;
  address: string;
  phone: string;
  note: string;
  paymentReference: string;
  paymentStatus: string;
  status: string;
  deliveryStatus: string;
  paidAt: string;
  cartItems: CartItem[];

}


interface Buyer {
  id: string;
  email: string;
}

export interface SellerOrder {
  id: string;
  product: Product;
  buyer: Buyer;
  quantity: number;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  deliveryStatus: string;
  address: string;
  phone: string;
  note: string;
  paidAt: Date; // You can use Date if you're handling it as a Date object
}


export interface MergedData {
  paymentReference: string;
  paidAt: string;
  totalPrice: number;
  quantity: number;
  cartItems: { name: string; price: number; quantity: number }[];
  note: string;
  address: string;
  phone: string;
  name: string;
  email: string;
}


export interface Acc {
  paymentReference: string;
  paidAt: string;
  totalPrice: number;
  quantity: number;
  cartItems: { name: string; price: number; quantity: number }[];
  note: string;
  address: string;
  phone: string;
  name: string;
  email: string;
}
