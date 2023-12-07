import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload.sort((blog1, blog2) => blog2.likes - blog1.likes);
    },
    createBlog: (state, action) => {
      state.push(action.payload);
    },
    removeBlogById: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
    likeBlogById: (state, action) => {
      const updatedBlog = action.payload;
      return state
        .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        .sort((blog1, blog2) => blog2.likes - blog1.likes);
    },
  },
});

export const { setBlogs, createBlog, removeBlogById, likeBlogById } =
  blogSlice.actions;

export default blogSlice.reducer;
