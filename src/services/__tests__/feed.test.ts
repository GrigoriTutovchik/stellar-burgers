import { feedReducer } from '../slices/feed';
import {
  loadFeedData,
  getOrdersData,
  getAllOrders,
  isLoading,
  getError,
  initialState
} from '../slices/feed';
import { TOrdersData } from '@utils-types';

const mockOrdersData: TOrdersData = {
  orders: [
    {
      _id: '1',
      ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733cd'],
      status: 'done',
      name: 'Краторный бургер',
      createdAt: '2025-03-05T10:00:00.000Z',
      updatedAt: '2025-03-05T10:30:00.000Z',
      number: 12345
    }
  ],
  total: 100,
  totalToday: 10
};

describe('Тест редьюсера feedSlice', () => {
  it('Должен возвращать начальное состояние', () => {
    const state = feedReducer(initialState, { type: 'unknown' });
    expect(state).toEqual({
      getOrdersData: null,
      orders: [],
      error: null,
      loading: false
    });
  });

  describe('Экшен loadFeedData.pending', () => {
    it('Должен устанавливать loading в true', () => {
      const action = { type: loadFeedData.pending.type };
      const state = feedReducer(initialState, action);

      expect(state).toEqual({
        getOrdersData: null,
        orders: [],
        error: null,
        loading: true
      });
      expect(isLoading({ feed: state })).toBe(true);
    });
  });

  describe('Экшен loadFeedData.fulfilled', () => {
    it('Должен сохранять данные заказов и менять loading на false', () => {
      const action = {
        type: loadFeedData.fulfilled.type,
        payload: mockOrdersData
      };
      const state = feedReducer(initialState, action);

      expect(state).toEqual({
        getOrdersData: mockOrdersData,
        orders: mockOrdersData.orders,
        error: null,
        loading: false
      });
      expect(getOrdersData({ feed: state })).toEqual(mockOrdersData);
      expect(getAllOrders({ feed: state })).toEqual(mockOrdersData.orders);
      expect(isLoading({ feed: state })).toBe(false);
    });
  });

  describe('Экшен loadFeedData.rejected', () => {
    it('Должен сохранять ошибку и менять loading на false', () => {
      const error = { message: 'Error' };
      const action = {
        type: loadFeedData.rejected.type,
        error
      };
      const state = feedReducer(initialState, action);

      expect(state).toEqual({
        getOrdersData: null,
        orders: [],
        error,
        loading: false
      });
      expect(getError({ feed: state })).toEqual(error);
      expect(isLoading({ feed: state })).toBe(false);
    });
  });
});
