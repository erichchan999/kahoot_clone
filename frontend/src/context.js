import React from 'react';

export const initialValue = {
  error: false,
  errorMessage: '',
};

export const Context = React.createContext(initialValue);
export const useContext = React.useContext;
