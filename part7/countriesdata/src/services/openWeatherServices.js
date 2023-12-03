import axios from "axios";

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

const get = async (latlng) => {
  const [lat, lon] = latlng;
  const res = await axios.get(baseUrl + `&lat=${lat}&lon=${lon}`);

  return res.data;
};

export default { get };
