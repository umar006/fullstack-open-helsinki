import Anecdotes from "./components/Anecdotes";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdotesFilter from "./components/AnecdotesFilter";

const App = () => {
  return (
    <>
      <h1>Anecdotes</h1>
      <AnecdoteForm />
      <AnecdotesFilter />
      <Anecdotes />
    </>
  );
};

export default App;
