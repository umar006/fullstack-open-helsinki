import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/Anecdotes";
import AnecdotesFilter from "./components/AnecdotesFilter";
import Notification from "./components/Notification";
import { setAnecdotes } from "./reducers/anecdoteReducer";
import anecdoteServices from "./services/anecdoteServices";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteServices
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  });

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
