import { useSelector } from "react-redux";
import Anecdotes from "./Anecdotes";
import AnecdoteForm from "./AnecdoteForm";

const App = () => {
  const anecdotes = useSelector((state) => state);

  return (
    <>
      <AnecdoteForm />
      <Anecdotes anecdotes={anecdotes} />
    </>
  );
};

export default App;
