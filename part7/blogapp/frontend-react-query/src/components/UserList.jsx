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
    <tr
      key={user.id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </th>
      <td className="text-center">{user.blogs.length}</td>
    </tr>
  ));

  return (
    <div>
      <h2 className="text-3xl font-bold my-4">Users</h2>
      <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
