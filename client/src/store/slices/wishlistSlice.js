// store/slices/wishlistSlice.js - wishlist products, shared by Navbar, Wishlist page,
// and product cards/details (heart control).
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchWishlist = createAsyncThunk('wishlist/fetch', async () => {
  const { data } = await api.get('/wishlist');
  return data;
});

export const addToWishlist = createAsyncThunk('wishlist/add', async (productId) => {
  const { data } = await api.post('/wishlist', { productId });
  return data;
});

export const removeFromWishlist = createAsyncThunk('wishlist/remove', async (productId) => {
  const { data } = await api.delete(`/wishlist/${productId}`);
  return data;
});

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlistState(state) {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith('wishlist/') && action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('wishlist/') && action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload.products;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('wishlist/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export const { clearWishlistState } = wishlistSlice.actions;

// selectors
export const selectWishlistProducts = (state) => state.wishlist.products;
export const selectIsWishlisted = (productId) => (state) =>
  state.wishlist.products.some((p) => p._id === productId);

export default wishlistSlice.reducer;
