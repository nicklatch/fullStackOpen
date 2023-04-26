/* eslint-disable react/prop-types */
const SingleMatch = ({ results }) => {
  const country = results[0];

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital(s): {country.capital.join(", ")}</div>
      <div>Area: {country.area}</div>
      <h4>Language(s):</h4>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </>
  );
};

export default SingleMatch;
