import { createSlice } from "@reduxjs/toolkit";

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      return state.concat({
        id: generateId(),
        content,
        votes: 0,
      });
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
  },
});

export const { createAnecdote, giveAnecdoteVote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
