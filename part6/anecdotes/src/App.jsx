import Anecdotes from "./components/Anecdotes";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  return (
    <>
      <h1>Anecdotes</h1>
      <AnecdoteForm />
      <Anecdotes />
    </>
  );
};

export default App;
