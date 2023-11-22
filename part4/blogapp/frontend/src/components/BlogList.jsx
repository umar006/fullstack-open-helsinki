import { useEffect } from "react";
import { useState } from "react";
import blogServices from "../services/blogServices";
import BlogForm from "./BlogForm";

const Blog = ({ blog }) => {
  return (
    <p>
      {blog.title} {blog.author}
    </p>
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

  const blogList = blogs.map((blog) => <Blog key={blog.id} blog={blog} />);

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
