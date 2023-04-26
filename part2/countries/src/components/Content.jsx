/* eslint-disable react/prop-types */
import Results from "./Results";
import SingleMatch from "./SingleMatch";

const Content = ({ search, results }) => {
  const resLen = results.length;

  if (resLen > 10 && search) {
    return <div>Please Narrow Your Search</div>;
  } else if (resLen < 10 && resLen > 1) {
    return <Results results={results} />;
  } else if (resLen === 1) {
    return <SingleMatch results={results} />;
  }
};

export default Content;
