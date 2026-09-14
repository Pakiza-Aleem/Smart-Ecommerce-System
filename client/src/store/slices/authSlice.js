// store/slices/authSlice.js - who is logged in, everywhere in the app

import { createSlice } from '@reduxjs/toolkit';

const savedUser = localStorage.getItem('ZENTRO_user');

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { user, token } = action.payload;
      localStorage.setItem('ZENTRO_token', token);
      localStorage.setItem('ZENTRO_user', JSON.stringify(user));
      state.user = user;
    },
    logout(state) {
      localStorage.removeItem('ZENTRO_token');
      localStorage.removeItem('ZENTRO_user');
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

// selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';

export default authSlice.reducer;
