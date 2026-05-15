import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import sellerReducer from './features/sellerSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
