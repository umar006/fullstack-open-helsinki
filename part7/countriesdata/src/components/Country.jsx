import { useState } from "react";
import openWeatherServices from "../services/openWeatherServices";
import { useEffect } from "react";

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

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <p>languages:</p>
      <ul>
        {Object.keys(country.languages).map((language) => (
          <li key={language}>{country.languages[language]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather country={country} />
    </div>
  );
};

const Country = ({ country }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div>
      {country.name.common}
      <button onClick={handleShow}>{show ? "close" : "show"}</button>
      {show ? <CountryDetail country={country} /> : null}
    </div>
  );
};

const CountryList = ({ countries, query }) => {
  let searchedCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query),
  );

  if (searchedCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  searchedCountries = searchedCountries.map((country, _, countries) => {
    if (countries.length === 1)
      return <CountryDetail key={Number(country.ccn3)} country={country} />;

    return <Country key={Number(country.ccn3)} country={country} />;
  });

  return searchedCountries;
};

export default CountryList;
