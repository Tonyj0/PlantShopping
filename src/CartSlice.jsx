// CartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],  // Array of cart items: { name, cost, image, quantity }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);
      if (existingItem) {
        // If already in cart, increment quantity
        existingItem.quantity += newItem.quantity || 1;
      } else {
        // Else, add new item with default quantity = 1
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
        });
      }
    },

    // Remove item completely by name
    removeItem: (state, action) => {
      const nameToRemove = action.payload;
      state.items = state.items.filter(item => item.name !== nameToRemove);
    },

    // Update item quantity
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

// Export actions for components (ProductList, CartItem)
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Export reducer to use in store.js
export default cartSlice.reducer;
