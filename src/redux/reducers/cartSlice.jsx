import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers: {
        addToCart: (state, action) => {
            let existingItem = state.cartItems.find((item) => item.description === action.payload.description);
            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                state.cartItems = [...state.cartItems, action.payload];
            }
        },
        updateCart: (state, action) => {
            let existingItem = state.cartItems.find((item) => item.description === action.payload.description);
            existingItem.quantity += action.payload.update;
            if (existingItem.quantity === 0) {
                state.cartItems = state.cartItems.filter((item) => item.description !== action.payload.description);
            }
        }
    }
})

export const { addToCart, updateCart } = cartSlice.actions;

export const getCartItems = state => state.cart;

export default cartSlice.reducer;