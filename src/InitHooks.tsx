'use client';
import React from 'react';
import UseGetCurrentUser from './hooks/UseGetCurrentUser';
import UseGetAllSeller from './hooks/UseGetAllSeller';

const InitHooks = () => {
  UseGetCurrentUser();
  UseGetAllSeller();

  return null;
};

export default InitHooks;
