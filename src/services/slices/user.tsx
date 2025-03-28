import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
  TLoginData
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const apiGetUser = createAsyncThunk('user/getuser', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);

const setAuthTokens = (data: { accessToken: string; refreshToken: string }) => {
  setCookie('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setAuthTokens(data);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: TLoginData) => {
    const data = await loginUserApi(userData);
    setAuthTokens(data);
    return data;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  error: SerializedError | null;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error;
        state.isAuthChecked = true;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
        state.user = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error;
        state.isAuthChecked = true;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(apiGetUser.pending, (state) => {
        state.isAuthChecked = false;
        state.user = null;
        state.error = null;
      })
      .addCase(apiGetUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.user = null;
        state.error = action.error;
      })
      .addCase(apiGetUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.user = null;
        state.error = null;
      });
  },
  selectors: {
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectUser: (state) => state.user,
    selectError: (state) => state.error
  }
});

export const { selectIsAuthChecked, selectUser, selectError } =
  userSlice.selectors;
export default userSlice.reducer;
