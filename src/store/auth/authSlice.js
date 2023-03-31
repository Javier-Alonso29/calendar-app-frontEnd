import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'checking', //'authenticated', 'not-authenticated'
    user: {},
    errorMessage: undefined
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    onChecking: (state) => {

        state.status = 'checking';
        state.user = {};
        state.errorMessage = undefined;

    },
    onLogin: (state, { payload } ) => {

        state.status = 'authenticated';
        state.user = payload;
        state.errorMessage = undefined

    },
    onLogOut: (state, { payload }) => {
        state.status = 'not-authenticated';
        state.user = {};
        state.errorMessage = payload
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined
    }
  }
});

export const {onChecking, onLogin, onLogOut, clearErrorMessage} = authSlice.actions

export default authSlice.reducer