/* eslint-disable react/prop-types */
const Results = ({ results, setSearch }) => {
  const handleClick = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      {results.map((country) => (
        <div key={country.ccn3}>
          {country.name.common}{" "}
          <button onClick={handleClick} value={country.name.common}>
            Show
          </button>
        </div>
      ))}
    </>
  );
};

export default Results;
