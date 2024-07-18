import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './../../Types/types';
import { RootState } from './../store';


const initialState  = {
  gists: [],
};

export const publicGistsSlice = createSlice({
  name: 'publicGists',
  initialState,
  reducers: {
    setGists: (state, action: PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const { setGists } = publicGistsSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default publicGistsSlice.reducer;