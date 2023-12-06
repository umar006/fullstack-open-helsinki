import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    value: null,
  },
  reducers: {},
});

export const {} = notificationSlice.actions;

export default notificationSlice.reducer;
