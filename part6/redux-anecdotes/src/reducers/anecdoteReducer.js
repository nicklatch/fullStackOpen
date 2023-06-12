const initialState = {
  anecdotes: [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ],
  filter: String(),
};

const getId = () => Number(Math.floor(Math.random() * 100000));

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialAnecdotes = initialState['anecdotes'].map(asObject);
console.log(initialAnecdotes);

const reducer = (state = initialAnecdotes, action) => {
  let id, anecdoteGettingVote, updatedAnecdote;

  switch (action.type) {
    case 'VOTE':
      id = action.payload.id;
      anecdoteGettingVote = state.find((anecdote) => anecdote.id === id);
      updatedAnecdote = {
        ...anecdoteGettingVote,
        votes: anecdoteGettingVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      );
    case 'NEW_ANECDOTE':
      return [...state, action.payload];
    default:
      return state;
  }
};

export const captureVote = (id) => {
  return {
    type: 'VOTE',
    payload: { id },
  };
};

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      id: getId(),
      votes: 0,
    },
  };
};

export default reducer;
