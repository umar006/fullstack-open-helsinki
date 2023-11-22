import axios from "axios";

const baseUrl = "/api/blogs";
let token = null;

const setToken = (userToken) => {
  token = `Bearer ${userToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl, {
    headers: { Authorization: token },
  });
  const response = await request.data;

  return response;
};

export default { getAll, setToken };
