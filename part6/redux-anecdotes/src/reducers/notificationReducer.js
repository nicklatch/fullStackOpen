import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(action, state) {
      return state.payload;
    },
    clearNotification(action, state) {
      return state.payload;
    },
  },
});

export const { createNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
