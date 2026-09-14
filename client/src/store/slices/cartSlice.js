// store/slices/cartSlice.js - cart state shared across Navbar (badge), Cart page,
// and product cards/details (Add to Cart). 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
  const { data } = await api.get('/cart');
  return data;
});

export const addToCart = createAsyncThunk('cart/add', async ({ productId, quantity = 1 }) => {
  const { data } = await api.post('/cart', { productId, quantity });
  return data;
});

export const updateCartItem = createAsyncThunk('cart/update', async ({ productId, quantity }) => {
  const { data } = await api.put(`/cart/${productId}`, { quantity });
  return data;
});

export const removeFromCart = createAsyncThunk('cart/remove', async (productId) => {
  const { data } = await api.delete(`/cart/${productId}`);
  return data;
});

const initialState = {
  items: [],
  total: 0,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartState(state) {
      state.items = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith('cart/') && action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('cart/') && action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.status = 'succeeded';
          state.items = action.payload.items;
          state.total = action.payload.total;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('cart/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export const { clearCartState } = cartSlice.actions;

// selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);

export default cartSlice.reducer;
