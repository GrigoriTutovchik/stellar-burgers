import { rootReducer } from '../store';
import { userSlice } from '../slices/user';
import { ingredientsSlice } from '../slices/ingredient';
import { feedSlice } from '../slices/feed';
import { userOrdersSlice } from '../slices/user_order';
import { constructorSlice } from '../slices/constructor';

describe('Тест rootReducer', () => {
  test('Должен возвращать корректное начальное состояние', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    const expectedState = {
      [userSlice.name]: userSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      [ingredientsSlice.name]: ingredientsSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      [feedSlice.name]: feedSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      [constructorSlice.name]: constructorSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      [userOrdersSlice.name]: userOrdersSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      })
    };

    expect(initialState).toEqual(expectedState);
  });
});
