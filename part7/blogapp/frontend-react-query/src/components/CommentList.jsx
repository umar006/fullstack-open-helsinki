import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import blogServices from "../services/blogServices";

const CommentList = () => {
  const blogId = useParams().id;

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
      <ul>{commentList}</ul>
    </div>
  );
};

export default CommentList;
