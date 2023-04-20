import Button from "./Button";

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

export default Vote;
