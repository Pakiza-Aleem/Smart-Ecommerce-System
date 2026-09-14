// store/slices/aiSlice.js - ZEN's panel/loading/result state.
// The backend remains responsible for every Gemini call; this slice only
// tracks what ZEN is doing in the UI right now.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const runSmartShopping = createAsyncThunk('ai/smartShopping', async (query) => {
  const { data } = await api.post('/ai/shopping', { query });
  return data;
});

export const runCompareProducts = createAsyncThunk('ai/compare', async (productIds) => {
  const { data } = await api.post('/ai/compare', { productIds });
  return data;
});

export const runProductQuestion = createAsyncThunk('ai/productQuestion', async ({ productId, question }) => {
  const { data } = await api.post('/ai/product-question', { productId, question });
  return data;
});

export const runRecommendations = createAsyncThunk('ai/recommendations', async (context = '') => {
  const { data } = await api.post('/ai/recommendations', { context });
  return data;
});

const initialState = {
  isPanelOpen: false,
  activeOperation: null, // 'search' | 'budget' | 'compare' | 'question' | 'recommendations' | null
  loading: false,
  error: null,
  result: null,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    openZenPanel(state) {
      state.isPanelOpen = true;
    },
    closeZenPanel(state) {
      state.isPanelOpen = false;
      state.activeOperation = null;
    },
    setActiveOperation(state, action) {
      state.activeOperation = action.payload;
      state.result = null;
      state.error = null;
    },
    clearAiResult(state) {
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith('ai/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('ai/') && action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.loading = false;
          state.result = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('ai/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const { openZenPanel, closeZenPanel, setActiveOperation, clearAiResult } = aiSlice.actions;

// selectors
export const selectZenPanelOpen = (state) => state.ai.isPanelOpen;
export const selectZenActiveOperation = (state) => state.ai.activeOperation;
export const selectZenLoading = (state) => state.ai.loading;
export const selectZenResult = (state) => state.ai.result;
export const selectZenError = (state) => state.ai.error;

export default aiSlice.reducer;
