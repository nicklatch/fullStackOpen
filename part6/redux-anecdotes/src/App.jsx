import { useSelector, useDispatch } from 'react-redux';
import { captureVote, createAnecdote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);
  anecdotes.sort((a, b) => b.votes - a.votes);

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{' '}
            <button onClick={() => dispatch(captureVote(anecdote.id))}>
              vote
            </button>{' '}
          </div>
        </div>
      ))}
      <AnecdoteForm />
    </div>
  );
};

export default App;
