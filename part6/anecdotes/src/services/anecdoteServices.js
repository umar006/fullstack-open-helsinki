import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  const response = await request.data;

  return response;
};

export default { getAll };
