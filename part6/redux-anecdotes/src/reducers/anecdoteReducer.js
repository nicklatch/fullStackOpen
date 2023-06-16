import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateVote(state, action) {
      const updatedAnecdote = action.payload;
      const unsortedAnecdotes = state.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      );
      return unsortedAnecdotes.toSorted((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { updateVote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    console.log(anecdotes);
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const updatedAnecdoteVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdoteVote = await anecdoteService.updatedAnecdoteVote(
      anecdote
    );
    dispatch(updateVote(updatedAnecdoteVote));
  };
};

export default anecdoteSlice.reducer;
