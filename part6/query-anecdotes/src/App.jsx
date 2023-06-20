import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getAnecdotes, updateAnecdoteVotes } from './requests';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useNotificationDispatch } from './NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const updatedAnecdoteMutation = useMutation(updateAnecdoteVotes, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData(
        'anecdotes',
        anecdotes.map((anecdote) => {
          return anecdote.id !== updatedAnecdote.id
            ? anecdote
            : updatedAnecdote;
        })
      );
    },
    onError: (error) => {
      dispatch({ type: 'SET-NOTIFICATION', payload: error.message });
    },
  });

  const handleVote = (anecdote) => {
    updatedAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({
      type: 'SET-NOTIFICATION',
      payload: `You voted for "${anecdote.content}"`,
    });
    setTimeout(() => {
      dispatch({ type: 'CLEAR-NOTIFICATION' });
    }, 5000);
  };

  const result = useQuery('anecdotes', getAnecdotes, { retry: 2 });

  if (result.isLoading) {
    return <div>Loading...</div>;
  } else if (result.isError) {
    return <div>anecdote server not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
