import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};

const create = async (content) => {
  if (content.length < 5)
    throw new Error("content must have length at least 5 characters");

  const response = await axios.post(baseUrl, { content, votes: 0 });

  return response.data;
};

const vote = async (anecdote) => {
  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, votedAnecdote);

  return response.data;
};

export default { getAll, create, vote };
