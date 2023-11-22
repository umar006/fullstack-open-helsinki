import { useEffect } from "react";
import { useState } from "react";
import blogServices from "../services/blogServices";

const Blog = ({ blog }) => {
  return (
    <p>
      {blog.title} {blog.author}
    </p>
  );
};

const BlogList = ({ user }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await blogServices.getAll(user);
      setBlogs(response);
    };

    fetchData();
  }, [user]);

  const blogList = blogs.map((blog) => <Blog key={blog.id} blog={blog} />);

  return (
    <>
      <h1>Blog List</h1>
      <h3>{user.name} logged in</h3>
      {blogList}
    </>
  );
};

export default BlogList;