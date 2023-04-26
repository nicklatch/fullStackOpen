/* eslint-disable react/prop-types */
import { useEffect } from "react";
import SingleMatch from "./SingleMatch";

//TODO: split content conditional rendering into own component

const Results = ({ search, countryData, results, setResults }) => {
  useEffect(() => {
    setResults(
      countryData.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  if (results.length > 10 && search) {
    return <div>Please Narrow Your Search</div>;
  } else if (results.length < 10 && results.length > 1) {
    return (
      <div>
        {results.map((country) => (
          <div key={country.ccn3}>{country.name.common}</div>
        ))}
      </div>
    );
  } else if (results.length === 1) {
    return <SingleMatch results={results} />;
  }
};

export default Results;
