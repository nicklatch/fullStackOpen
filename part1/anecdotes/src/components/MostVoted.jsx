const MostVoted = ({ points, anecdotes }) => {
  const votesArr = Object.values(points);
  const highVote = Math.max(...votesArr);

  const mostVotedAnecdote =
    anecdotes[votesArr.findIndex((element) => element == highVote)];

  return <div>{mostVotedAnecdote}</div>;
};

export default MostVoted;
