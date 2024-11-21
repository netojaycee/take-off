import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cartItems:
    typeof window !== "undefined" && localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { data, quantity = 1 } = action.payload;

      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === data.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += quantity;
        toast.success(`${data.name} quantity increased`, {
          position: "bottom-left",
        });
      } else {
        const tempProduct = { ...data, cartQuantity: quantity };
        state.cartItems.push(tempProduct);
        toast.success(`${data.name} added to Cart`, {
          position: "bottom-left",
        });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
      toast.error(`${action.payload.name} removed from Cart`, {
        position: "bottom-left",
      });
    },

    decreaseCartQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.success(`${action.payload.name} quantity decreased`, {
          position: "bottom-left",
        });
      } else {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        toast.error(`${action.payload.name} removed from Cart`, {
          position: "bottom-left",
        });
        state.cartItems = nextCartItems;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    clearCart(state) {
      state.cartItems = [];
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
      toast.success(`Cart Cleared`, {
        position: "top-right",
      });
    },

    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },

    // New function to increase quantity alone
    increaseCartQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(`${action.payload.name} quantity increased`, {
          position: "bottom-left",
        });

        if (typeof window !== "undefined") {
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      }
    },

    // New function to get the quantity of a specific item
    getItemQuantity(state, action) {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      return item ? item.cartQuantity : 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCartQuantity,
  clearCart,
  getTotals,
  increaseCartQuantity,
  getItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
