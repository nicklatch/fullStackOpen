/* eslint-disable react/prop-types */
import Results from "./Results";
import SingleMatch from "./SingleMatch";

const ResultsContent = ({ search, setSearch, results }) => {
  const resLen = results.length;

  if (resLen > 10 && search) {
    return <div>Please Narrow Your Search</div>;
  } else if (resLen < 10 && resLen > 1) {
    return <Results results={results} setSearch={setSearch} />;
  } else if (resLen === 1) {
    return <SingleMatch results={results} />;
  }
};

export default ResultsContent;
