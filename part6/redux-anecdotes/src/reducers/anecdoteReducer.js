import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

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
      return state.concat(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { captureVote, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlice.reducer;
