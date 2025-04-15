import { userReducer } from '../slices/user';
import {
  userSlice,
  apiGetUser,
  updateUser,
  registerUser,
  loginUser,
  logoutUser,
  selectIsAuthChecked,
  selectUser,
  selectError,
  initialState
} from '../slices/user';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('тесты registerUser', () => {
  it('registerUser.fulfilled успешно', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: mockUser }
    };

    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: null
    });
  });

  it('registerUser.rejected должен сохранять ошибку', () => {
    const error = { message: 'Error' };
    const action = {
      type: registerUser.rejected.type,
      error
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      user: null,
      isAuthChecked: true,
      error
    });
  });
});

describe('тесты loginUser', () => {
  it('loginUser.fulfilled успешно', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: mockUser }
    };

    const state = userSlice.reducer(initialState, action);

    expect(selectUser({ user: state })).toEqual(mockUser);
    expect(selectIsAuthChecked({ user: state })).toBe(true);
  });

  it('loginUser.rejected должен сохранять ошибку', () => {
    const error = { message: 'Error' };
    const action = {
      type: loginUser.rejected.type,
      error
    };

    const state = userSlice.reducer(initialState, action);

    expect(selectError({ user: state })).toEqual(error);
    expect(selectUser({ user: state })).toBeNull();
  });
});

describe('тесты apiGetUser', () => {
  it('apiGetUser.fulfilled успешно', () => {
    const action = {
      type: apiGetUser.fulfilled.type,
      payload: { user: mockUser }
    };

    const state = userSlice.reducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('apiGetUser.rejected должен сохранять ошибку', () => {
    const error = { message: 'Error' };
    const action = {
      type: apiGetUser.rejected.type,
      error
    };

    const state = userSlice.reducer(initialState, action);

    expect(state.error).toEqual(error);
    expect(state.isAuthChecked).toBe(true);
  });
});

describe('тесты updateUser', () => {
  it('updateUser.fulfilled должен обновлять пользователя', () => {
    const updatedUser = { ...mockUser, name: 'new name' };
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: updatedUser }
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(updatedUser);
  });

  it('updateUser.rejected должен сохранять ошибку', () => {
    const error = { message: 'Error' };
    const action = {
      type: updateUser.rejected.type,
      error
    };

    const state = userSlice.reducer(initialState, action);

    expect(state.error).toEqual(error);
    expect(state.isAuthChecked).toBe(false);
  });
});

describe('тесты logoutUser', () => {
  it('logoutUser.fulfilled должен сбрасывать пользователя', () => {
    const action = {
      type: logoutUser.fulfilled.type
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      user: null,
      isAuthChecked: true,
      error: null
    });
  });
});
