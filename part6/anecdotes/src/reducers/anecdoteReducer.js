import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, content: "If it hurts, do it more often.", votes: 0 },
  {
    id: 2,
    content: "Adding manpower to a late software project makes it later!",
    votes: 0,
  },
  {
    id: 3,
    content:
      "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    votes: 0,
  },
];

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,
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
