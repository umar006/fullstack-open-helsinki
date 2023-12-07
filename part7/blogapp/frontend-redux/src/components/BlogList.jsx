import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../reducers/blogReducer";
import blogServices from "../services/blogServices";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import "./BlogList.css";
import Notification from "./Notification";
import Togglable from "./Togglable";

const BlogList = () => {
  const blogFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await blogServices.getAll();
      dispatch(setBlogs(response));
    };

    fetchData();
  }, []);

  const blogList = blogs.map((blog) => (
    <Blog key={blog.id} user={user} blog={blog} />
  ));

  return (
    <>
      <Notification notification={notification} />
      <Togglable
        ref={blogFormRef}
        buttonLabelShow="new blog"
        buttonLabelHide="cancel"
      >
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      {blogList}
    </>
  );
};

export default BlogList;
