import { useQuery } from "@tanstack/react-query";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import NotificationContext from "../contexts/NotificationContext";
import blogServices from "../services/blogServices";
import BlogForm from "./BlogForm";
import "./BlogList.css";
import Notification from "./Notification";
import Togglable from "./Togglable";

const BlogList = () => {
  const blogFormRef = useRef();
  const [msg, _] = useContext(NotificationContext);

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogServices.getAll,
  });

  if (result.isLoading) return <div>sabar bro...</div>;

  const blogs = result.data;

  const blogList = blogs
    .sort((blog1, blog2) => blog2.likes - blog1.likes)
    .map((blog) => (
      <div key={blog.id} className="blog">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
    ));

  return (
    <>
      <Notification message={msg} />
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
