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
      <img src={country.flags.svg} alt={country.flags.alt} />
    </div>
  );
};

const Country = ({ country }) => {
  return <div>{country.name.common}</div>;
};

const CountryList = ({ countries, query }) => {
  const searchedCountries = countries
    .filter((country) => country.name.common.toLowerCase().includes(query))
    .map((country, _, countries) => {
      if (countries.length === 1)
        return <CountryDetail key={Number(country.ccn3)} country={country} />;

      if (countries.length > 10) {
        return (
          <div key={Number(country.ccn3)}>
            Too many matches, specify another filter
          </div>
        );
      }

      return <Country key={Number(country.ccn3)} country={country} />;
    });

  return searchedCountries;
};

export default CountryList;
