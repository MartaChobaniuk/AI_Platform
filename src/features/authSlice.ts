import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  userId: string | null;
}

const initialState: AuthState = {
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = authSlice.actions;
export default authSlice.reducer;