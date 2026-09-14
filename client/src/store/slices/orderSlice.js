// store/slices/orderSlice.js - order history, shared by Orders page and
// used after Checkout completes.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchOrders = createAsyncThunk('orders/fetchAll', async () => {
  const { data } = await api.get('/orders');
  return data;
});

export const createOrder = createAsyncThunk('orders/create', async (orderData) => {
  const { data } = await api.post('/orders', orderData);
  return data;
});

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : action.payload.orders || [];
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  },
});

// selectors
export const selectOrders = (state) => state.orders.items;
export const selectOrderStatus = (state) => state.orders.status;

export default orderSlice.reducer;
