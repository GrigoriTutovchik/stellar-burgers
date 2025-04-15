import { orderBurgerApi } from '../../utils/burger-api';
import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';

export const placeConstructorOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export interface TConstructorState {
  items: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  loading: boolean;
  order: TOrder | null;
  error: string | undefined;
}

export const initialState: TConstructorState = {
  items: {
    bun: null,
    ingredients: []
  },
  loading: false,
  order: null,
  error: undefined
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addConstructorItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') state.items.bun = action.payload;
        else state.items.ingredients.push(action.payload);
      },
      prepare: (ingredient: TConstructorIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeConstructorItem: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.items.ingredients = state.items.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearConstructor: (state) => (state = initialState),
    updateConstructorIngredients: (
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.items.ingredients = action.payload;
    },
    resetOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeConstructorOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(placeConstructorOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(placeConstructorOrder.pending, (state) => {
        state.loading = true;
      });
  },
  selectors: {
    selectConstructorItems: (state) => state.items,
    selectOrderLoad: (state) => state.loading,
    selectOrderData: (state) => state.order
  }
});

export const {
  addConstructorItem,
  removeConstructorItem,
  clearConstructor,
  updateConstructorIngredients,
  resetOrder
} = constructorSlice.actions;
export const { selectConstructorItems, selectOrderLoad, selectOrderData } =
  constructorSlice.selectors;
export const burgerConstructorReducer = constructorSlice.reducer;
