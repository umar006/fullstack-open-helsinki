import axios from "axios";
import { Diary } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async (): Promise<Diary[]> => {
  const response = await axios.get<Diary[]>(baseUrl);

  return response.data;
};

export default { getAll };
