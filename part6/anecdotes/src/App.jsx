import Anecdotes from "./components/Anecdotes";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdotesFilter from "./components/AnecdotesFilter";
import Notification from "./components/Notification";

const App = () => {
  return (
    <>
      <h1>Anecdotes</h1>
      <Notification />
      <AnecdoteForm />
      <AnecdotesFilter />
      <Anecdotes />
    </>
  );
};

export default App;
