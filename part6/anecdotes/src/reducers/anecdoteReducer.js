import { createSlice } from "@reduxjs/toolkit";
import anecdoteServices from "../services/anecdoteServices";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return state.concat(action.payload);
    },
    giveAnecdoteVote(state, action) {
      const idToVote = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === idToVote);
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== idToVote ? anecdote : changedAnecdote,
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServices.create(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const { giveAnecdoteVote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
