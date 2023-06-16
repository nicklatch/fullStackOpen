import { useDispatch, useSelector } from 'react-redux';
import { updatedAnecdoteVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(updatedAnecdoteVote(anecdote));
    dispatch(setNotification(`You voted for "${anecdote.content}"`, 5000));
  };
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} <button onClick={handleClick}>vote</button>{' '}
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes;
    } else {
      return anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
    }
  });

  const sortedAnecdtoes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  return (
    <>
      {sortedAnecdtoes.map((anecdote) => {
        return <Anecdote key={anecdote.id} anecdote={anecdote} />;
      })}
    </>
  );
};

export default AnecdoteList;
