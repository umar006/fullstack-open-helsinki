import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/Anecdotes";
import AnecdotesFilter from "./components/AnecdotesFilter";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
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
