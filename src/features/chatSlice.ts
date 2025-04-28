import { createSlice } from '@reduxjs/toolkit';

type initialStateTpe = {
  messages: Array<{ id: number; text: string, role: string }>;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateTpe = {
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },  
})

export default chatSlice.reducer;
export const { addMessage, setLoading, setError } = chatSlice.actions;