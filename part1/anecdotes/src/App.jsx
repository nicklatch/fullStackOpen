import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const NextAnecdote = ({ anecdotes, currState, stateSetter }) => {
  const randomIndex = () => Math.floor(Math.random() * anecdotes.length);
  const nextAnecdote = () => {
    let last;
    last = last != currState ? currState : nextAnecdote();
    return stateSetter(randomIndex());
  };

  return <Button handleClick={nextAnecdote} text="next anecdote" />;
};

const Vote = ({ currState }) => {
  const originalPoints = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 }; //find way to make this pragmaticly generated
  const copyPoints = { ...originalPoints };

  const currentLeader = (copyPoints) => {
    const localPoints = Object.values(copyPoints);
    console.log(localPoints);
    const sortedLocalPoints = localPoints.sort();
    return sortedLocalPoints[sortedLocalPoints.length - 1];
  };
  function handleVote({ currState }) {
    copyPoints[currState] += 1;
  }
  //return button
  return (
    <>
      <Button handleClick={handleVote} text="vote" />
      <div>{currentLeader(copyPoints)}</div>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <NextAnecdote
        anecdotes={anecdotes}
        currState={selected}
        stateSetter={setSelected}
      />
      <Vote currState={selected} />
    </>
  );
};

export default App;
