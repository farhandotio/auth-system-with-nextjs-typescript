'use client';
import { setUserData } from '@/store/features/userSlice';
import { AppDispatch } from '@/store/store';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const UseGetCurrentUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get('/api/user/current-user');
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
      }
    };
    fetchUser();
  }, []);
};

export default UseGetCurrentUser;
