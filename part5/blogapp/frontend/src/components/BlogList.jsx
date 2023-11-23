import { useEffect, useRef, useState } from "react";
import blogServices from "../services/blogServices";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import "./BlogList.css";

const Blog = ({ user, blog, blogs, setBlogs }) => {
  const [likes, setLikes] = useState(blog.likes);

  const handleDeleteBlog = async (event) => {
    const idToDelete = event.target.id;
    const confirmDelete = window.confirm(
      `Delete ${blog.title} by ${blog.author}`,
    );
    if (!confirmDelete) return;

    await blogServices.remove(idToDelete);

    setBlogs(blogs.filter((blog) => blog.id !== idToDelete));
  };

  const handleUpdateLikeBlog = async () => {
    const idToUpdate = blog.id;
    const updateLike = likes + 1;
    const updatedBlog = {
      ...blog,
      likes: updateLike,
    };

    await blogServices.update(idToUpdate, updatedBlog);

    setLikes(updateLike);
  };

  const isOwnedByUser = user.username === blog.user.username;
  const userCanDelete = isOwnedByUser ? (
    <button id={blog.id} onClick={handleDeleteBlog}>
      {" delete "}
    </button>
  ) : null;

  return (
    <>
      <div className="blog">
        {blog.title} {blog.author} {userCanDelete}
        <Togglable buttonLabelShow="view" buttonLabelHide="hide">
          <div>
            <p>{blog.url}</p>
            <p>
              {likes} <button onClick={handleUpdateLikeBlog}>like</button>
            </p>
            <p>{blog.user.name}</p>{" "}
          </div>
        </Togglable>
      </div>
    </>
  );
};

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
