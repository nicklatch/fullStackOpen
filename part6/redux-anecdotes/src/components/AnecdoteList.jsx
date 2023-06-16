import { useDispatch, useSelector } from 'react-redux';
import { updatedAnecdoteVote } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(updatedAnecdoteVote(anecdote));
    dispatch(createNotification(`You voted for "${anecdote.content}"`));
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
    if (filter === 'ALL' || filter === '') {
      return anecdotes;
    } else {
      return anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
    }
  });

  return (
    <>
      {anecdotes.map((anecdote) => {
        return <Anecdote key={anecdote.id} anecdote={anecdote} />;
      })}
    </>
  );
};

export default AnecdoteList;
