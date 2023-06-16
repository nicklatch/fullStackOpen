import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return action.payload;
    },
  },
});

export const { createNotification, clearNotification } =
  notificationSlice.actions;

export const setNotification = (notification, timeout) => {
  return (dispatch) => {
    dispatch(createNotification(notification));
    setTimeout(() => {
      dispatch(clearNotification(''));
    }, timeout);
  };
};
export default notificationSlice.reducer;
