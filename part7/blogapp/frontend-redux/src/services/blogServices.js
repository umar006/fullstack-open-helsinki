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

const create = async (newBlog) => {
  const request = await axios.post(baseUrl, newBlog, {
    headers: { Authorization: token },
  });
  const response = await request.data;

  return response;
};

const update = async (blogId, updatedBlog) => {
  const request = await axios.put(`${baseUrl}/${blogId}`, updatedBlog, {
    headers: { Authorization: token },
  });
  const response = await request.data;

  return response;
};

const remove = async (blogId) => {
  await axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: token },
  });
};

export default { getAll, create, update, remove, setToken };
