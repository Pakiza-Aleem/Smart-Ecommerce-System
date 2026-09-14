// store/slices/productSlice.js - product catalog + filter state shared by
// Home, Shop, and ProductDetails.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchProducts = createAsyncThunk('products/fetchAll', async (params = {}) => {
  const { data } = await api.get('/products', { params });
  return data;
});

export const fetchProductById = createAsyncThunk('products/fetchOne', async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
});

const initialState = {
  items: [],
  selected: null,
  filters: { search: '', category: '', minPrice: '', maxPrice: '', sort: '' },
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    clearSelectedProduct(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : action.payload.products || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selected = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilters, resetFilters, clearSelectedProduct } = productSlice.actions;

// selectors
export const selectProducts = (state) => state.products.items;
export const selectSelectedProduct = (state) => state.products.selected;
export const selectProductFilters = (state) => state.products.filters;
export const selectProductStatus = (state) => state.products.status;

export default productSlice.reducer;
