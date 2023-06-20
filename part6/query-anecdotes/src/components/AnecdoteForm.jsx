import { useQueryClient, useMutation } from 'react-query';
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote));
    },
    onError: (response) => {
      dispatch({
        type: 'SET-NOTIFICATION',
        payload: response.response.data.error,
      });
      setTimeout(() => {
        dispatch({ type: 'CLEAR-NOTIFICATION' });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({ type: 'SET-NOTIFICATION', payload: content });
    setTimeout(() => {
      dispatch({ type: 'CLEAR-NOTIFICATION' });
    }, 5000);
  };

  return (
    <div>
      <h3>Create New</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
