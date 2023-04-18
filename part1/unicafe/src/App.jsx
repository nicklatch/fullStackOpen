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
      <table>
        <tbody>
          <TableDataRow text="good" value={currentStates.good} />
          <TableDataRow text="neutral" value={currentStates.neutral} />
          <TableDataRow text="bad" value={currentStates.bad} />
          <TableDataRow text="all" value={total} />
          <TableDataRow text="average" value={average} />
          <TableDataRow text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  ) : (
    <div>
      <h2>statistics</h2>
      <div>No feedback given</div>
    </div>
  );
};

const TableDataRow = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
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
