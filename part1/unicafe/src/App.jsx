import { useState } from "react";

const Feedback = ({ handlers }) => {
  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handlers.handleGood} text="good" />
      <Button handleClick={handlers.handleNeutral} text="neutral" />
      <Button handleClick={handlers.handleBad} text="bad" />
    </div>
  );
};

const Statistics = ({ currentStates }) => {
  const total = Object.values(currentStates).reduce((a, b) => a + b, 0);
  const average = currentStates.good - currentStates.bad / total;
  const positive = `${total / currentStates.good} %`;

  return total !== 0 ? (
    <div>
      <h2>statistics</h2>
      <StatisticLine text="good" value={currentStates.good} />
      <StatisticLine text="neutral" value={currentStates.neutral} />
      <StatisticLine text="bad" value={currentStates.bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  ) : (
    <div>
      <h2>statistics</h2>
      <div>No feedback given</div>
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const StatisticLine = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
);

//root
const App = () => {
  //state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const currentStates = { good, neutral, bad };

  const handlers = {
    handleGood: () => setGood(good + 1),
    handleNeutral: () => setNeutral(neutral + 1),
    handleBad: () => setBad(bad + 1),
  };

  return (
    <>
      <Feedback handlers={handlers} />
      <Statistics currentStates={currentStates} />
    </>
  );
};

export default App;
