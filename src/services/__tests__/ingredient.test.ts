import {
  getIngredients,
  initialState,
  ingredientsReducer
} from '../slices/ingredient';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  }
];

describe('Тест редьюсера ingredientsSlice', () => {
  it('Должен возвращать начальное состояние', () => {
    const state = ingredientsReducer(initialState, { type: 'unknown' });
    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });
  });

  it('Должен обрабатывать getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ingredients: [],
      isLoading: true,
      error: null
    });
  });

  it('Должен обрабатывать getIngredients.fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ingredients: mockIngredients,
      isLoading: false,
      error: null
    });
  });

  it('Должен обрабатывать getIngredients.rejected', () => {
    const error = { message: 'Error' };
    const action = {
      type: getIngredients.rejected.type,
      error
    };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error
    });
  });
});
