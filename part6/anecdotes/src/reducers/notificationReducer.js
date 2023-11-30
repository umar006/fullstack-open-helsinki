import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const showNotification = (message, timeoutInSecond) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => dispatch(setNotification(null)), timeoutInSecond * 1000);
  };
};

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
