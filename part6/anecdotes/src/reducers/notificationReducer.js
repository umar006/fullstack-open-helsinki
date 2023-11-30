import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      console.log("masuk");
      return null;
    },
  },
});

export const { showNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
