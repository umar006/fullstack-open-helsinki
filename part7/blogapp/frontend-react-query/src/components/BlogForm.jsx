import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import NotificationContext from "../contexts/NotificationContext";
import {
  errorMessage,
  nullMessage,
  successMessage,
} from "../reducers/notificationReducer";
import blogServices from "../services/blogServices";

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [_, notifDispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogServices.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));

      setTitle("");
      setAuthor("");
      setUrl("");

      notifDispatch(successMessage(`a new blog ${title} by ${author} added`));
      setTimeout(() => {
        notifDispatch(nullMessage());
      }, 5000);
    },
    onError: (err) => {
      notifDispatch(errorMessage(err.response.data.errors));
      setTimeout(() => {
        notifDispatch(nullMessage());
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
      <h2 className="my-4 font-bold text-xl text-sky-500">create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title{" "}
          <input
            id="blog-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="title"
            className="mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
          />
        </div>
        <div>
          author{" "}
          <input
            id="blog-author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="author"
            className="mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
          />
        </div>
        <div>
          url{" "}
          <input
            id="blog-url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="url"
            className="mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
          />
        </div>
        <button
          type="submit"
          id="btn-create-blog"
          className="px-4 py-2 bg-sky-500 my-4 text-slate-100 font-medium"
        >
          create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
