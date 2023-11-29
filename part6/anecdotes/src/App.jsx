const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <span>{anecdote.content}</span>
      <div>
        <span>has {anecdote.votes} </span>
        <button>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = ({ anecdotes }) => {
  return (
    <>
      <h1>Anecdotes</h1>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </>
  );
};

const App = ({ store }) => {
  const anecdotes = store.getState();

  return (
    <div>
      <Anecdotes anecdotes={anecdotes} />
    </div>
  );
};

export default App;
