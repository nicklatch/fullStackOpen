import { createSlice } from '@reduxjs/toolkit';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => Number(Math.floor(Math.random() * 100000));

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotes.map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    captureVote(state, action) {
      const id = action.payload;
      const anecdoteGettingVote = state.find((anecdote) => anecdote.id === id);
      const updatedAnecdote = {
        ...anecdoteGettingVote,
        votes: anecdoteGettingVote.votes + 1,
      };
      const unsortedAnecdotes = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      );
      return unsortedAnecdotes.toSorted((a, b) => b.votes - a.votes);
    },
    createAnecdote(state, action) {
      const content = action.payload;
      return state.concat({
        content,
        id: getId(),
        votes: 0,
      });
    },
  },
});

export const { captureVote, createAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
