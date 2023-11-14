const Country = ({ country }) => {
  return <div>{country.name.common}</div>;
};

const CountryList = ({ countries, query }) => {
  const searchedCountries = countries
    .filter((country) => country.name.common.toLowerCase().includes(query))
    .map((country) => <Country key={Number(country.ccn3)} country={country} />);

  if (searchedCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return searchedCountries;
};

export default CountryList;
