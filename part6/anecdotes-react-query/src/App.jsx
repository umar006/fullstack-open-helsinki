import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

function App() {
  const handleVote = (anecdote) => {
    console.log("vote", anecdote);
  };

  const anecdotes = [
    {
      content: "If it hurts, do it more often",
      id: "47145",
      votes: 0,
    },
  ];

  return (
    <>
      <h1>Anecdotes App + React Query</h1>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{" "}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
