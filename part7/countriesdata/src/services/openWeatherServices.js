import axios from "axios";

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

const get = (latlng) => {
  const [lat, lon] = latlng;
  const req = axios.get(baseUrl + `&lat=${lat}&lon=${lon}`);
  return req.then((res) => {
    return res.data;
  });
};

export default { get };
