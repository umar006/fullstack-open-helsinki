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
      <h3>Comments</h3>
      <form onSubmit={handleCreateComment}>
        comment{" "}
        <input value={comment} onChange={(e) => setComment(e.target.value)} />{" "}
        <button type="submit">create</button>
      </form>
      <ul>{commentList}</ul>
    </div>
  );
};

export default CommentList;
