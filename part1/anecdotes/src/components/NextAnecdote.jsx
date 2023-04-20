import Button from "./Button";

const NextAnecdote = ({ anecdotesLength, currState, stateSetter }) => {
  const randomIndex = () => Math.floor(Math.random() * anecdotesLength);

  const getNextAnecdote = () => {
    let last;
    last = last != currState ? currState : getNextAnecdote();
    return stateSetter(randomIndex);
  };

  return <Button handleClick={getNextAnecdote} text="next anecdote" />;
};

export default NextAnecdote;
