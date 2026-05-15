'use client';
import { setAllSellerData, setLoading } from '@/store/features/sellerSlice';
import { AppDispatch } from '@/store/store';
import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface IFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  shopType?: string;
  sortBy?: string;
}

const useGetAllSeller = (params: IFilterParams = {}) => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchAllSeller = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get('/api/seller/all-seller', { params });

      dispatch(
        setAllSellerData({
          sellers: response.data.sellers,
          pagination: response.data.pagination,
        })
      );
    } catch (error) {
      console.error('Error fetching sellers:', error);
      dispatch(setAllSellerData({ sellers: [], pagination: null }));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, JSON.stringify(params)]);

  useEffect(() => {
    fetchAllSeller();
  }, [fetchAllSeller]);

  return { refetch: fetchAllSeller };
};

export default useGetAllSeller;
