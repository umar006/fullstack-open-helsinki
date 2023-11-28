import { useState } from "react";
import Togglable from "./Togglable";
import blogServices from "../services/blogServices";

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
              <span>{likes} </span>
              <button id="btn-like-blog" onClick={handleUpdateLikeBlog}>
                like
              </button>
            </p>
            <p>{blog.user.name}</p>{" "}
          </div>
        </Togglable>
      </div>
    </>
  );
};

export default Blog;
