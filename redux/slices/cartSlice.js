// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";

// const initialState = {
//   cartItems:
//     typeof window !== "undefined" && localStorage.getItem("cartItemsTake")
//       ? JSON.parse(localStorage.getItem("cartItemsTake"))
//       : [],
//   cartTotalQuantity: 0,
//   cartTotalAmount: 0,
// };

// const cartSlice = createSlice({
//   name: "cartTake",
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const { data, quantity = 1 } = action.payload;
//       const itemIndex = state.cartItems.findIndex(
//         (item) => item.id === data.id
//       );

//       if (itemIndex >= 0) {
//         state.cartItems[itemIndex].cartQuantity += quantity;
//         toast.success(`${data.name} quantity increased`, {
//           position: "bottom-left",
//         });
//       } else {
//         const tempProduct = { ...data, cartQuantity: quantity };
//         state.cartItems.push(tempProduct);
//         toast.success(`${data.name} added to Cart`, {
//           position: "bottom-left",
//         });
//       }

//       // Update cartTotalAmount
//       state.cartTotalAmount = state.cartItems.reduce(
//         (total, item) => total + item.price * item.cartQuantity,
//         0
//       );

//       if (typeof window !== "undefined") {
//         localStorage.setItem("cartItemsTake", JSON.stringify(state.cartItems));
//       }
//     },

//     removeFromCart(state, action) {
//       const nextCartItems = state.cartItems.filter(
//         (cartItem) => cartItem.id !== action.payload.id
//       );
//       state.cartItems = nextCartItems;

//       // Update cartTotalAmount
//       state.cartTotalAmount = state.cartItems.reduce(
//         (total, item) => total + item.price * item.cartQuantity,
//         0
//       );

//       if (typeof window !== "undefined") {
//         localStorage.setItem("cartItemsTake", JSON.stringify(state.cartItems));
//       }
//       toast.error(`${action.payload.name} removed from Cart`, {
//         position: "bottom-left",
//       });
//     },

//     decreaseCartQuantity(state, action) {
//       const itemIndex = state.cartItems.findIndex(
//         (cartItem) => cartItem.id === action.payload.id
//       );
//       if (state.cartItems[itemIndex].cartQuantity > 1) {
//         state.cartItems[itemIndex].cartQuantity -= 1;
//         toast.success(`${action.payload.name} quantity decreased`, {
//           position: "bottom-left",
//         });
//       } else {
//         const nextCartItems = state.cartItems.filter(
//           (cartItem) => cartItem.id !== action.payload.id
//         );
//         toast.error(`${action.payload.name} removed from Cart`, {
//           position: "bottom-left",
//         });
//         state.cartItems = nextCartItems;
//       }

//       // Update cartTotalAmount
//       state.cartTotalAmount = state.cartItems.reduce(
//         (total, item) => total + item.price * item.cartQuantity,
//         0
//       );

//       if (typeof window !== "undefined") {
//         localStorage.setItem("cartItemsTake", JSON.stringify(state.cartItems));
//       }
//     },

//     clearCart(state) {
//       state.cartItems = [];
//       state.cartTotalAmount = 0;

//       if (typeof window !== "undefined") {
//         localStorage.setItem("cartItemsTake", JSON.stringify(state.cartItems));
//       }
//       toast.success(`Cart Cleared`, {
//         position: "top-right",
//       });
//     },

//     getTotals(state) {
//       let { total, quantity } = state.cartItems.reduce(
//         (cartTotal, cartItem) => {
//           const { price, cartQuantity } = cartItem;
//           const itemTotal = price * cartQuantity;
//           cartTotal.total += itemTotal;
//           cartTotal.quantity += cartQuantity;

//           return cartTotal;
//         },
//         {
//           total: 0,
//           quantity: 0,
//         }
//       );
//       state.cartTotalQuantity = quantity;
//       state.cartTotalAmount = total;
//     },
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   decreaseCartQuantity,
//   clearCart,
//   getTotals,
// } = cartSlice.actions;

// export default cartSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cartItems:
    typeof window !== "undefined" && localStorage.getItem("cartItemsTake")
      ? JSON.parse(localStorage.getItem("cartItemsTake"))
      : [],
  cartTotalQuantity: 
    typeof window !== "undefined" && localStorage.getItem("cartTotalQuantityTake")
      ? JSON.parse(localStorage.getItem("cartTotalQuantityTake"))
      : 0,
  cartTotalAmount: 
    typeof window !== "undefined" && localStorage.getItem("cartTotalAmountTake")
      ? JSON.parse(localStorage.getItem("cartTotalAmountTake"))
      : 0,
};

const cartSlice = createSlice({
  name: "cartTake",
  initialState,
  reducers: {
    updateCartTotals(state) {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, item) => {
          const itemTotal = item.price * item.cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += item.cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalAmount = total;
      state.cartTotalQuantity = quantity;

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cartTotalAmountTake", JSON.stringify(total));
        localStorage.setItem("cartTotalQuantityTake", JSON.stringify(quantity));
        localStorage.setItem("cartItemsTake", JSON.stringify(state.cartItems));
      }
    },

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

      // Update totals
      cartSlice.caseReducers.updateCartTotals(state);
    },

    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItems;

      toast.error(`${action.payload.name} removed from Cart`, {
        position: "bottom-left",
      });

      // Update totals
      cartSlice.caseReducers.updateCartTotals(state);
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

      // Update totals
      cartSlice.caseReducers.updateCartTotals(state);
    },

    clearCart(state) {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItemsTake", JSON.stringify(state.cartItems));
        localStorage.setItem("cartTotalAmountTake", JSON.stringify(0));
        localStorage.setItem("cartTotalQuantityTake", JSON.stringify(0));
      }
      toast.success(`Cart Cleared`, {
        position: "top-right",
      });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCartQuantity,
  clearCart,
  updateCartTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
