import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './slices/user';
import { ingredientsSlice } from './slices/ingredient';
import { feedSlice } from './slices/feed';
import { constructorSlice } from './slices/constructor';
import { userOrdersSlice } from './slices/user_order';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
