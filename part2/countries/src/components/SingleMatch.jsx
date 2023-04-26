const SingleMatch = ({ results }) => {
  const country = results[0];
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital[0]}</div>
      <div>Area: {country.area}</div>
      <h4>Language(s):</h4>
      <ul>
        <li>languages here</li> {/*TODO: add countries*/}
      </ul>
      <img
        src={country.flags["png" ? "png" : "svg"]}
        alt={`${country.name.common}'s flag`}
      />
    </>
  );
};

export default SingleMatch;
