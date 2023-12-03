import { useEffect, useState } from "react";
import openWeatherServices from "../services/openWeatherServices";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    openWeatherServices
      .get(country.capitalInfo.latlng)
      .then((res) => setWeather(res));
  }, [country]);

  if (!weather) return null;

  const weatherIcons = weather.weather.map((w) => (
    <img
      key={w.id}
      src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
      alt={w.description}
    />
  ));

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      {weatherIcons}
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
