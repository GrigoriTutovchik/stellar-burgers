import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

export const loadFeedData = createAsyncThunk('feed/fetchFeedData', getFeedsApi);

export interface FeedState {
  getOrdersData: TOrdersData | null;
  orders: TOrder[];
  error: SerializedError | null;
  loading: boolean;
}

const initialState: FeedState = {
  getOrdersData: null,
  orders: [],
  error: null,
  loading: false
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFeedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadFeedData.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.getOrdersData = action.payload;
          state.orders = action.payload.orders;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(loadFeedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
  selectors: {
    getOrdersData: (state) => state.getOrdersData,
    getAllOrders: (state) => state.orders,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  }
});

export const { getOrdersData, getAllOrders, isLoading, getError } =
  feedSlice.selectors;
export default feedSlice;
