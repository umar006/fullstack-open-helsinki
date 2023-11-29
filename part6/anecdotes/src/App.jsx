import { useSelector } from "react-redux";
import Anecdotes from "./Anecdotes";
import AnecdoteForm from "./AnecdoteForm";

const App = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes),
  );

  return (
    <>
      <AnecdoteForm />
      <Anecdotes anecdotes={anecdotes} />
    </>
  );
};

export default App;
