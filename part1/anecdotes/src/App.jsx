import { useState } from "react";

//helper to set initial points state
const originalPoints = (arr) => {
  return Array.from({ length: arr.length }, (_, i) => i).reduce(
    (acc, curr) => ((acc[curr] = 0), acc),
    {}
  );
}; /* creates an array the range of anecdotes length, turns that into an object with each element becoming a key set to a value of 0 */

const VoteCount = ({ currStatesPoints }) => {
  return (
    <>
      <div>has {currStatesPoints} votes</div>
    </>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const NextAnecdote = ({ anecdotesLength, currState, stateSetter }) => {
  const randomIndex = () => Math.floor(Math.random() * anecdotesLength);

  const nextAnecdote = () => {
    let last;
    last = last != currState ? currState : nextAnecdote();
    return stateSetter(randomIndex);
  };

  return <Button handleClick={nextAnecdote} text="next anecdote" />;
};

const Vote = ({ currState, points, stateSetter }) => {
  const handleVote = () => {
    return stateSetter(() => ({
      ...points,
      [currState]: (points[currState] += 1),
    }));
  };

  return (
    <>
      <Button handleClick={handleVote} text="vote" />
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
  const [points, setPoints] = useState(originalPoints(anecdotes));
  console.log("toplevel", selected, points, points[selected]);

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <VoteCount currStatesPoints={points[selected]} />
      <NextAnecdote
        anecdotesLength={anecdotes.length}
        currState={selected}
        stateSetter={setSelected}
      />
      <Vote currState={selected} points={points} stateSetter={setPoints} />
    </>
  );
};

export default App;
