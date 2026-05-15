import { IUser } from '@/models/user.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISellerState {
  allSellerData: IUser[];
  pagination: {
    totalSellers: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  } | null;
  loading: boolean;
}

const initialState: ISellerState = {
  allSellerData: [],
  pagination: null,
  loading: false,
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAllSellerData: (state, action: PayloadAction<{ sellers: IUser[]; pagination: any }>) => {
      state.allSellerData = action.payload.sellers;
      state.pagination = action.payload.pagination;
    },
    clearSellerData: (state) => {
      state.allSellerData = [];
      state.pagination = null;
    },
  },
});

export const { setAllSellerData, setLoading, clearSellerData } = sellerSlice.actions;
export default sellerSlice.reducer;
