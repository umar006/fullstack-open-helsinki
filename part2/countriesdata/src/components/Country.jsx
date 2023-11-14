const Country = ({ country }) => {
  return <div>{country.name.common}</div>;
};

const CountryList = ({ countries, query }) => {
  return countries
    .filter((country) => country.name.common.toLowerCase().includes(query))
    .map((country) => <Country key={Number(country.ccn3)} country={country} />);
};

export default CountryList;
