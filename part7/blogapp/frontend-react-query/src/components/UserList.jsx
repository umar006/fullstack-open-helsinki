import { useQuery } from "@tanstack/react-query";
import userServices from "../services/userServices";
import { Link } from "react-router-dom";

const UserList = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: userServices.getAll,
  });

  if (result.isLoading) return <div>Sabar bro...</div>;

  const users = result.data;

  const userList = users.map((user) => (
    <tr key={user.id}>
      <th>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </th>
      <td>{user.blogs.length}</td>
    </tr>
  ));

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blog created</th>
          </tr>
        </thead>
        <tbody>{userList}</tbody>
      </table>
    </div>
  );
};

export default UserList;
