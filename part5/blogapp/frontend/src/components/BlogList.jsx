import { useEffect } from "react";
import { useState } from "react";
import blogServices from "../services/blogServices";
import BlogForm from "./BlogForm";

const Blog = ({ blog, blogs, setBlogs }) => {
  const handleDeleteBlog = async (event) => {
    const idToDelete = event.target.id;
    const confirmDelete = window.confirm(`Delete ${blog.title}?`);
    if (!confirmDelete) return;

    await blogServices.remove(idToDelete);

    setBlogs(blogs.filter((blog) => blog.id !== idToDelete));
  };

  return (
    <>
      <p>
        {blog.title} {blog.author}{" "}
        <button id={blog.id} onClick={handleDeleteBlog}>
          delete
        </button>
      </p>
    </>
  );
};

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await blogServices.getAll();
      setBlogs(response);
    };

    fetchData();
  }, []);

  const blogList = blogs.map((blog) => (
    <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
  ));

  const hideWhenVisible = { display: blogFormVisible ? "none" : "" };
  const showWhenNotVisible = { display: blogFormVisible ? "" : "none" };

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>create</button>
      </div>
      <div style={showWhenNotVisible}>
        <BlogForm blogs={blogs} setBlogs={setBlogs} />
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
      {blogList}
    </>
  );
};

export default BlogList;
