import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

export const getUserOrders = createAsyncThunk(
  'userOrders/fetchUserOrders',
  getOrdersApi
);

interface UserOrdersState {
  orders: TOrder[];
  loading: boolean;
  error: SerializedError | null;
}

const initialState: UserOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orders = [];
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.orders = [];
      });
  },
  selectors: {
    selectUserOrders: (state) => state.orders,
    selectUserOrdersLoading: (state) => state.loading,
    selectUserOrdersError: (state) => state.error
  }
});

export const {
  selectUserOrders,
  selectUserOrdersLoading,
  selectUserOrdersError
} = userOrdersSlice.selectors;
export default userOrdersSlice.reducer;
