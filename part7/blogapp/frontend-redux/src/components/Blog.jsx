import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlogById, removeBlogById } from "../reducers/blogReducer";
import blogServices from "../services/blogServices";
import Togglable from "./Togglable";

const Blog = ({ user, blog }) => {
  const [likes, setLikes] = useState(blog.likes);
  const dispatch = useDispatch();

  const handleDeleteBlog = async () => {
    const idToDelete = blog.id;
    const confirmDelete = window.confirm(
      `Delete ${blog.title} by ${blog.author}`,
    );
    if (!confirmDelete) return;

    await blogServices.remove(idToDelete);

    dispatch(removeBlogById(idToDelete));
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
    dispatch(likeBlogById(updatedBlog));
  };

  const isOwnedByUser = user.username === blog.user.username;
  const userCanDelete = isOwnedByUser ? (
    <button onClick={handleDeleteBlog}>{" delete "}</button>
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
