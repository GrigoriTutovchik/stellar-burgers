import {
  userOrdersReducer,
  getUserOrders,
  selectUserOrders,
  selectUserOrdersLoading,
  selectUserOrdersError,
  initialState
} from '../slices/user_order';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733cd'],
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2025-03-05T10:00:00.000Z',
    updatedAt: '2025-03-05T10:30:00.000Z',
    number: 12345
  },
  {
    _id: '2',
    ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733ce'],
    status: 'pending',
    name: 'Флюоресцентный бургер',
    createdAt: '2025-03-05T11:00:00.000Z',
    updatedAt: '2023-03-05T11:30:00.000Z',
    number: 12346
  }
];

describe('Тест редьюсера userOrdersSlice', () => {
  it('Должен возвращать начальное состояние', () => {
    const state = userOrdersReducer(initialState, { type: 'unknown' });
    expect(state).toEqual({
      orders: [],
      loading: false,
      error: null
    });
  });

  describe('Экшен getUserOrders.pending', () => {
    it('Должен устанавливать loading в true и сбрасывать ошибку', () => {
      const error = { message: 'Error' };
      const initialState = {
        orders: mockOrders,
        loading: false,
        error
      };
      const action = {
        type: getUserOrders.pending.type
      };

      const state = userOrdersReducer(initialState, action);

      expect(state).toEqual({
        orders: [],
        loading: true,
        error: null
      });
      expect(selectUserOrdersLoading({ userOrders: state })).toBe(true);
    });
  });

  describe('Экшен getUserOrders.fulfilled', () => {
    it('Должен сохранять заказы и менять loading на false', () => {
      const action = {
        type: getUserOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = userOrdersReducer(initialState, action);

      expect(state).toEqual({
        orders: mockOrders,
        loading: false,
        error: null
      });
      expect(selectUserOrders({ userOrders: state })).toEqual(mockOrders);
      expect(selectUserOrdersLoading({ userOrders: state })).toBe(false);
    });
  });

  describe('Экшен getUserOrders.rejected', () => {
    it('Должен сохранять ошибку и менять loading на false', () => {
      const error = { message: 'Error' };
      const action = {
        type: getUserOrders.rejected.type,
        error
      };
      const state = userOrdersReducer(initialState, action);

      expect(state).toEqual({
        orders: [],
        loading: false,
        error
      });
      expect(selectUserOrdersError({ userOrders: state })).toEqual(error);
      expect(selectUserOrdersLoading({ userOrders: state })).toBe(false);
    });
  });
});
