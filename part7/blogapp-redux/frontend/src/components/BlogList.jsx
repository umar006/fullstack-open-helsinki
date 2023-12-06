import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import blogServices from "../services/blogServices";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import "./BlogList.css";
import Notification from "./Notification";
import Togglable from "./Togglable";

const BlogList = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();
  const [succesMessage, setSuccessMessage] = useState(null);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    const fetchData = async () => {
      const response = await blogServices.getAll();
      setBlogs(response);
    };

    fetchData();
  }, []);

  const blogList = blogs
    .sort((blog1, blog2) => blog2.likes - blog1.likes)
    .map((blog) => (
      <Blog
        key={blog.id}
        user={user}
        blog={blog}
        blogs={blogs}
        setBlogs={setBlogs}
      />
    ));

  return (
    <>
      <Notification notification={notification} success={succesMessage} />
      <Togglable
        ref={blogFormRef}
        buttonLabelShow="new blog"
        buttonLabelHide="cancel"
      >
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          blogFormRef={blogFormRef}
          setSuccessMessage={setSuccessMessage}
        />
      </Togglable>
      {blogList}
    </>
  );
};

export default BlogList;
