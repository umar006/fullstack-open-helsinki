import { useQuery } from "@tanstack/react-query";
import userServices from "../services/userServices";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const userId = useParams().id;
  const result = useQuery({
    queryKey: ["users/detail", userId],
    queryFn: () => userServices.getOne(userId),
  });

  if (result.isLoading) return <div>Sabar bro...</div>;

  const user = result.data;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
