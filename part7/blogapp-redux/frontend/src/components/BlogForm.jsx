import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import {
  setErrorNotification,
  setSuccessNotification,
} from "../reducers/notificationReducer";
import blogServices from "../services/blogServices";

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    try {
      blogFormRef.current.toggleVisibility();
      const createdBlog = await blogServices.create({ title, author, url });

      setTitle("");
      setAuthor("");
      setUrl("");
      dispatch(createBlog(createdBlog));
      dispatch(
        setSuccessNotification(`a new blog ${title} by ${author} added`),
      );
      setTimeout(() => {
        dispatch(setSuccessNotification(null));
      }, 5000);
    } catch (err) {
      dispatch(setErrorNotification(err.response.data.errors));
      setTimeout(() => {
        dispatch(setErrorNotification(null));
      }, 5000);
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title{" "}
          <input
            id="blog-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="title"
          />
        </div>
        <div>
          author{" "}
          <input
            id="blog-author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="author"
          />
        </div>
        <div>
          url{" "}
          <input
            id="blog-url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="url"
          />
        </div>
        <button type="submit" id="btn-create-blog">
          create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
