import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },

    removeItem: (state, action) => {
      const id = action.payload;
      const updatedItems = [];

      state.totalPrice = 0;

      for (let item of state.items) {
        if (item.documentId === id) {
          item.cartQuantity -= 1;
        }

        if (item.cartQuantity > 0) {
          updatedItems.push(item);
        }
      }

      state.items = updatedItems;
      state.items.forEach((item) => {
        const priceAfterOffer = item.price * (1 - parseFloat(item.offer) / 100);
        state.totalPrice += priceAfterOffer * item.cartQuantity;
      });
    },

    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.documentId === newItem.documentId
      );

      const priceAfterOffer =
        newItem.price * (1 - parseFloat(newItem.offer) / 100);

      if (existingItem) {
        existingItem.cartQuantity += 1;
      } else {
        state.items.push({ ...newItem, cartQuantity: 1 });
      }

      state.totalPrice += priceAfterOffer;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
