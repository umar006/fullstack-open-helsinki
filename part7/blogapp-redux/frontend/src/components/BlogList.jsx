import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../reducers/blogReducer";
import blogServices from "../services/blogServices";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import "./BlogList.css";
import Notification from "./Notification";
import Togglable from "./Togglable";

const BlogList = ({ user }) => {
  const [oldBlogs, setOldBlogs] = useState([]);
  const blogFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await blogServices.getAll();
      dispatch(setBlogs(response));
      setOldBlogs(response);
    };

    fetchData();
  }, []);

  const blogList = blogs
    .map((blog) => (
      <Blog
        key={blog.id}
        user={user}
        blog={blog}
        blogs={blogs}
        setBlogs={setOldBlogs}
      />
    ))
    .sort((blog1, blog2) => blog2.likes - blog1.likes);

  return (
    <>
      <Notification notification={notification} />
      <Togglable
        ref={blogFormRef}
        buttonLabelShow="new blog"
        buttonLabelHide="cancel"
      >
        <BlogForm
          blogs={blogs}
          setBlogs={setOldBlogs}
          blogFormRef={blogFormRef}
        />
      </Togglable>
      {blogList}
    </>
  );
};

export default BlogList;
