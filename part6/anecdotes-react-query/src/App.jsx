import { useQuery } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import anecdoteServices from "./services/anecdoteServices";

function App() {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdoteServices.getAll,
  });

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  if (result.isError) {
    return (
      <div>
        {result.error.message}: anecdote service is not avaiable due to problems
        in server
      </div>
    );
  }

  const handleVote = (anecdote) => {
    console.log("vote", anecdote);
  };

  const anecdotes = result.data;

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
