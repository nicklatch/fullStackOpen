import { useSelector, useDispatch } from 'react-redux';
import { captureVote } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(captureVote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
