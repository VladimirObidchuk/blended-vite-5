import { createSlice } from '@reduxjs/toolkit';
import { fetchBaseCurrency, fetchExchangeInfo } from './operation';
import { Action } from '@remix-run/router';

const initialState = {
  baseCurrency: '',
  isLoading: false,
  isError: null,
  exchangeInfo: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reduer: {
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchBaseCurrency.fulfilled, (state, { payload }) => {
        state.baseCurrency = payload;
      })
      .addCase(fetchExchangeInfo.pending, (state, { payload }) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchExchangeInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.exchangeInfo = payload;
      })
      .addCase(fetchExchangeInfo.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.exchangeInfo = null;
        state.isError = payload;
      }),
});
export const { setBaseCurrency } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
