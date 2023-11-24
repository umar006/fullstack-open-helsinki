import { useEffect, useRef, useState } from "react";
import blogServices from "../services/blogServices";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import "./BlogList.css";

const BlogList = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();

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
      <Togglable
        ref={blogFormRef}
        buttonLabelShow="new blog"
        buttonLabelHide="cancel"
      >
        <BlogForm blogs={blogs} setBlogs={setBlogs} blogFormRef={blogFormRef} />
      </Togglable>
      {blogList}
    </>
  );
};

export default BlogList;
