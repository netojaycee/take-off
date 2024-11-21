import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  favoriteItems:
    typeof window !== "undefined" && localStorage.getItem("favoriteItems")
      ? JSON.parse(localStorage.getItem("favoriteItems"))
      : [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action) {
      const { id } = action.payload;
      if (!state.favoriteItems.some((item) => item.id === id)) {
        state.favoriteItems.push(action.payload);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "favoriteItems",
            JSON.stringify(state.favoriteItems)
          );
        }
        toast.success(`${action.payload.name} added to Wishlist`, {
          position: "bottom-left",
        });
      }

      console.log("slice", state.favoriteItems);
    },
    removeFromFavorites(state, action) {
      const nextFavoriteItems = state.favoriteItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.favoriteItems = nextFavoriteItems;
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "favoriteItems",
          JSON.stringify(state.favoriteItems)
        );
      }
      toast.error(`${action.payload.name} removed from Wishlist`, {
        position: "bottom-left",
      });
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
