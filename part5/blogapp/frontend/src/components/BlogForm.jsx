import { useState } from "react";
import Notification from "./Notification";
import blogServices from "../services/blogServices";

const BlogForm = ({ blogs, setBlogs, blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [succesMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    try {
      blogFormRef.current.toggleVisibility();
      const createdBlog = await blogServices.create({ title, author, url });

      setBlogs(blogs.concat(createdBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setSuccessMessage(`a new blog ${title} by ${author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (err) {
      setErrorMessage(err.response.data.errors);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <Notification success={succesMessage} error={errorMessage} />
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title{" "}
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author{" "}
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url{" "}
          <input value={url} onChange={(event) => setUrl(event.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
