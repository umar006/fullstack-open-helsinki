import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import blogServices from "../services/blogServices";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import "./BlogList.css";
import Togglable from "./Togglable";

const BlogList = ({ user }) => {
  const [oldBlogs, setBlogs] = useState([]);
  const blogFormRef = useRef();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogServices.getAll,
  });

  if (result.isLoading) return <div>sabar bro...</div>;

  const blogs = result.data;

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
