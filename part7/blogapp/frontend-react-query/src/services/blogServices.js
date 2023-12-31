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

const getOne = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}`, {
    headers: { Authorization: token },
  });

  return response.data;
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

const getAllComments = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`, {
    headers: { Authorization: token },
  });

  return response.data;
};

const createComment = async (blogId, newComment) => {
  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    newComment,
    {
      headers: { Authorization: token },
    },
  );

  return response.data;
};

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
  getAllComments,
  createComment,
  setToken,
};
