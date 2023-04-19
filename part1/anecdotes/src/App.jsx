import { useState } from "react";

/* helper to create initial points state object, creates array the length of
arr.length, then uses reduce to create object with arr[*] as the keys set to value of 0 */
const originalPoints = (arr) => {
  return Array.from({ length: arr.length }, (_, i) => i).reduce(
    (acc, curr) => ((acc[curr] = 0), acc),
    {}
  );
};

const Heading = ({ headingLevel, text }) => {
  const LevelOfHeading = headingLevel;
  return <LevelOfHeading>{text}</LevelOfHeading>;
};

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

  const getNextAnecdote = () => {
    let last;
    last = last != currState ? currState : getNextAnecdote();
    return stateSetter(randomIndex);
  };

  return <Button handleClick={getNextAnecdote} text="next anecdote" />;
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

const MostVoted = ({ points, anecdotes }) => {
  const votesArr = Object.values(points);
  const highVote = Math.max(...votesArr);

  const mostVotedAnecdote =
    anecdotes[votesArr.findIndex((element) => element == highVote)];

  return <div>{mostVotedAnecdote}</div>;
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

  return (
    <>
      <Heading headingLevel="h2" text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <VoteCount currStatesPoints={points[selected]} />
      <Vote currState={selected} points={points} stateSetter={setPoints} />
      <NextAnecdote
        anecdotesLength={anecdotes.length}
        currState={selected}
        stateSetter={setSelected}
      />
      <Heading headingLevel="h2" text="Anecdote with most votes" />
      <MostVoted points={points} anecdotes={anecdotes} />
    </>
  );
};

export default App;
