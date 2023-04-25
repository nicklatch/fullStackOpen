/* eslint-disable react/prop-types */

const Results = ({ search, countryData, results, setResults }) => {
  let res = countryData.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  //TODO: set res to setResults

  return (
    <>
      {res.map((country) => (
        <div key={country}>{country.name.common}</div>
      ))}
    </>
  );
};

export default Results;
