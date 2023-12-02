import anecdoteServices from "../services/anecdoteServices";

const Anecdote = ({ anecdote, anecdotes, setAnecdotes }) => {
  const handleDeleteAnecdote = async () => {
    const idToDelete = anecdote.id;

    await anecdoteServices.remove(idToDelete);

    setAnecdotes(anecdotes.filter((anecdote) => anecdote.id !== idToDelete));
  };

  return (
    <>
      <a href={anecdote.url} target="_blank" rel="noreferrer">
        {anecdote.content}
      </a>{" "}
      <button onClick={handleDeleteAnecdote}>delete</button>
    </>
  );
};

const Anecdotes = ({ anecdotes, setAnecdotes }) => {
  const anecdoteList = anecdotes.map((anecdote) => (
    <li key={anecdote.id}>
      <Anecdote
        anecdote={anecdote}
        anecdotes={anecdotes}
        setAnecdotes={setAnecdotes}
      />
    </li>
  ));

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>{anecdoteList}</ul>
    </div>
  );
};

export default Anecdotes;
