import { useState } from "react";
import blogServices from "../services/blogServices";
import Notification from "./Notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [succesMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogServices.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
    },
  });

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    try {
      blogFormRef.current.toggleVisibility();

      newBlogMutation.mutate({ title, author, url });

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
