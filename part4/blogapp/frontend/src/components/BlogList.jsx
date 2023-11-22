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

const BlogList = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await blogServices.getAll(user);
      setBlogs(response);
    };

    fetchData();
  }, [user]);

  const blogList = blogs.map((blog) => (
    <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
  ));

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  return (
    <>
      <h1>Blog List</h1>
      <h3>
        {user.name} {"logged in "}
        <button onClick={handleLogout}>logout</button>
      </h3>
      <BlogForm blogs={blogs} setBlogs={setBlogs} />
      {blogList}
    </>
  );
};

export default BlogList;
