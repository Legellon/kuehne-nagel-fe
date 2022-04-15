import { configureStore } from "@reduxjs/toolkit";
import shipmentsReducer from '../features/shipmentsSlice';

export const store = configureStore({
   reducer: {
      shipments: shipmentsReducer,
   }
});