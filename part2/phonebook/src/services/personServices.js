import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = (newPerson) => {
  const req = axios.post(baseUrl, newPerson);
  return req.then((res) => res.data);
};

const update = (id, updatedPerson) => {
  const req = axios.put(`${baseUrl}/${id}`, updatedPerson);
  return req.then((res) => res.data);
};

const remove = (id) => {
  axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, remove };
