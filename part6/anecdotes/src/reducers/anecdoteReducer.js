import { createSlice } from "@reduxjs/toolkit";
import anecdoteServices from "../services/anecdoteServices";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return state.concat(action.payload);
    },
    voteAnecdote(state, action) {
      const idToVote = action.payload.id;
      const votedAnecdote = action.payload;

      return state.map((anecdote) =>
        anecdote.id !== idToVote ? anecdote : votedAnecdote,
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

export const giveAnecdoteVote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteId = anecdote.id;
    anecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const votedAnecdote = await anecdoteServices.vote(anecdoteId, anecdote);
    dispatch(voteAnecdote(votedAnecdote));
  };
};

export const { voteAnecdote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
