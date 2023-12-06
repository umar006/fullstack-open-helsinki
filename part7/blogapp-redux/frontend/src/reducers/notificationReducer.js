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
    setSuccessNotification: (state, action) => {
      state.message = action.payload;
      state.error = false;
    },
  },
});

export const { setErrorNotification, setSuccessNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
