import { useState } from "react";
import CountryDetail from "./CountryDetail";

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

  if (searchedCountries.length === 0) {
    return <div>Not found...</div>;
  }

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
