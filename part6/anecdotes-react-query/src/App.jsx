import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useReducer } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import NotificationContext from "./components/NotificationContext";
import notificationReducer from "./reducers/notificationReducer";
import anecdoteServices from "./services/anecdoteServices";

function App() {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdoteServices.getAll,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: anecdoteServices.vote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });

      notificationDispatch({
        type: "SET",
        payload: `anecdote '${data.content}' voted`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "SET", payload: null });
      }, 5000);
    },
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
    mutation.mutate(anecdote);
  };

  const anecdotes = result.data;

  return (
    <>
      <h1>Anecdotes App + React Query</h1>

      <NotificationContext.Provider
        value={[notification, notificationDispatch]}
      >
        <Notification message={notification} />
        <AnecdoteForm notificationDispatch={notificationDispatch} />
      </NotificationContext.Provider>

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
