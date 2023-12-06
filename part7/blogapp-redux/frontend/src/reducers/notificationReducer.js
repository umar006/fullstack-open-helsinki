import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
    error: false,
  },
  reducers: {
    setErrorNotification: (state, action) => {
      state.message = action.payload;
      state.error = true;
    },
  },
});

export const { setErrorNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
