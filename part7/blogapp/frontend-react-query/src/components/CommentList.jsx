import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import blogServices from "../services/blogServices";

const CommentList = () => {
  const blogId = useParams().id;
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const newCommentMutation = useMutation({
    mutationFn: (newComment) => blogServices.createComment(blogId, newComment),
    onSuccess: (newComment) => {
      const comments = queryClient.getQueryData(["blogs/comments", blogId]);
      queryClient.setQueryData(
        ["blogs/comments", blogId],
        comments.concat(newComment),
      );

      setComment("");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleCreateComment = (e) => {
    e.preventDefault();

    newCommentMutation.mutate({ comment });
  };

  const result = useQuery({
    queryKey: ["blogs/comments", blogId],
    queryFn: () => blogServices.getAllComments(blogId),
  });

  if (result.isLoading) return <div>Sabar bro...</div>;

  if (result.isError) {
    console.error(result.error);
  }

  const comments = result.data || [];

  const commentList = comments.map((comment) => (
    <li key={comment.id}>{comment.comment}</li>
  ));

  return (
    <div>
      <h3 className="font-bold text-xl py-4">Comments</h3>
      <form onSubmit={handleCreateComment}>
        comment{" "}
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
        />{" "}
        <button
          type="submit"
          className="bg-sky-500 py-2 px-4 text-white font-medium ml-2"
        >
          create
        </button>
      </form>
      <ul className="list-disc list-inside pt-4 pl-4">{commentList}</ul>
    </div>
  );
};

export default CommentList;
