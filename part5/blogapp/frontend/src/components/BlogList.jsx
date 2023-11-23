import { useEffect } from "react";
import { useState } from "react";
import blogServices from "../services/blogServices";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

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
      <div>
        {blog.title} {blog.author}{" "}
        <button id={blog.id} onClick={handleDeleteBlog}>
          delete
        </button>{" "}
        <Togglable buttonLabel="view">
          <div>
            <p>{blog.url}</p>
            <p>{blog.likes}</p>
            <p>{blog.user.name}</p>{" "}
          </div>
        </Togglable>
      </div>
    </>
  );
};

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

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

  return (
    <>
      <Togglable buttonLabel="new blog">
        <BlogForm blogs={blogs} setBlogs={setBlogs} />
      </Togglable>
      {blogList}
    </>
  );
};

export default BlogList;
