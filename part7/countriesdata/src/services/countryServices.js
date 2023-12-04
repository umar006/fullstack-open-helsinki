import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getOne = async (countryName) => {
  const response = await axios.get(baseUrl + "/name/" + countryName);

  return response.data;
};

export default { getOne };
