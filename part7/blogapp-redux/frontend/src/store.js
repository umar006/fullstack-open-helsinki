import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import notificationReducer from "./reducers/notificationReducer";

export default configureStore({
  reducer: {
    blogs: blogReducer,
    login: loginReducer,
    notification: notificationReducer,
  },
});
