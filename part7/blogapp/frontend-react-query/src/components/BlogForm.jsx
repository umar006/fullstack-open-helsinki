import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import NotificationContext from "../contexts/NotificationContext";
import blogServices from "../services/blogServices";
import Notification from "./Notification";

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [msg, msgDispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogServices.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));

      setTitle("");
      setAuthor("");
      setUrl("");

      msgDispatch({
        type: "SET",
        payload: {
          success: `a new blog ${title} by ${author} added`,
          error: null,
        },
      });
      setTimeout(() => {
        msgDispatch({ type: "SET", payload: null });
      }, 5000);
    },
    onError: (err) => {
      msgDispatch({
        type: "SET",
        payload: {
          error: err.response.data.errors,
          success: null,
        },
      });
      setTimeout(() => {
        msgDispatch({ type: "SET", payload: null });
      }, 5000);
    },
  });

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    blogFormRef.current.toggleVisibility();

    newBlogMutation.mutate({ title, author, url });
  };

  return (
    <>
      <Notification message={msg} />
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
