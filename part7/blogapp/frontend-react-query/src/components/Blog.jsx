import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import blogServices from "../services/blogServices";
import CommentList from "./CommentList";

const Blog = ({ user }) => {
  const blogId = useParams().id;
  const queryClient = useQueryClient();

  const deleteBlogMutation = useMutation({
    mutationFn: blogServices.remove,
    onSuccess: (_, deletedBlogId) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((blog) => blog.id !== deletedBlogId),
      );
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const likeBlogMutation = useMutation({
    mutationFn: (updatedBlog) =>
      blogServices.update(updatedBlog.id, updatedBlog),
    onSuccess: (_, updatedBlog) => {
      queryClient.setQueryData(["blogs", blogId], updatedBlog);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const handleDeleteBlog = async (event) => {
    const idToDelete = event.target.id;
    const confirmDelete = window.confirm(
      `Delete ${blog.title} by ${blog.author}`,
    );
    if (!confirmDelete) return;

    deleteBlogMutation.mutate(idToDelete);
  };

  const handleUpdateLikeBlog = async () => {
    const updateLike = blog.likes + 1;
    const updatedBlog = {
      ...blog,
      likes: updateLike,
    };

    likeBlogMutation.mutate(updatedBlog);
  };

  const result = useQuery({
    queryKey: ["blogs", blogId],
    queryFn: () => blogServices.getOne(blogId),
  });

  if (result.isLoading) return <div>Sabar bro...</div>;

  const blog = result.data;

  const isOwnedByUser = user.username === blog.user.username;
  const userCanDelete = isOwnedByUser ? (
    <button id={blog.id} onClick={handleDeleteBlog}>
      {" delete "}
    </button>
  ) : null;

  return (
    <>
      <div className="blog">
        <h2>
          {blog.title} {blog.author}
        </h2>{" "}
        {userCanDelete}
        <div>
          <p>{blog.url}</p>
          <p>
            <span>{blog.likes} </span>
            <button id="btn-like-blog" onClick={handleUpdateLikeBlog}>
              like
            </button>
          </p>
          <p>{blog.user.name}</p>{" "}
        </div>
      </div>
      <CommentList />
    </>
  );
};

export default Blog;
