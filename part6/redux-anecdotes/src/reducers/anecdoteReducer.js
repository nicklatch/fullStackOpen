import { createSlice } from '@reduxjs/toolkit';

const getId = () => Number(Math.floor(Math.random() * 100000));

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
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
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { captureVote, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
