import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialState, IUser } from './../../Types/types';
import { RootState } from './../store';

const storedUser = localStorage.getItem('user');
const parsedUser: IUser | null = storedUser ? JSON.parse(storedUser) : null;

const initialState: IInitialState = {
  isAuthenticated: parsedUser !== null,
  user: parsedUser,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;