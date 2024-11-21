import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // cartSlice.reducer ডিফল্ট এক্সপোর্ট হয়েছে

export const store = configureStore({
  reducer: {
    cart: cartReducer, // cartReducer ব্যবহার করা হচ্ছে
  },
});
