import { useState } from "react";
import blogServices from "../services/blogServices";

const BlogForm = ({
  blogs,
  setBlogs,
  blogFormRef,
  setSuccessMessage,
  setErrorMessage,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
