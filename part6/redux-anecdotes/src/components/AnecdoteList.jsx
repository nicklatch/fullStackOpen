import { useDispatch, useSelector } from 'react-redux';
import { captureVote } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}{' '}
        <button onClick={() => dispatch(captureVote(anecdote.id))}>vote</button>{' '}
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
