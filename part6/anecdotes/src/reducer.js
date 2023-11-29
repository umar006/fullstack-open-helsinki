const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "GIVE_VOTE": {
      const idToVote = action.payload.id;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === idToVote);
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== idToVote ? anecdote : changedAnecdote,
      );
    }
    default:
      return state;
  }
};

export default anecdoteReducer;
