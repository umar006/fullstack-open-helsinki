import { useState } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/Anecdotes";
import Footer from "./components/Footer";
import { useEffect } from "react";
import anecdoteServices from "./services/anecdoteServices";

function App() {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    const fetchAnecdotes = async () => {
      const anecdotes = await anecdoteServices.getAll();
      setAnecdotes(anecdotes);
    };

    fetchAnecdotes();
  }, []);

  return (
    <>
      <h1>Software anecdotes</h1>
      <AnecdoteForm anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
      <Anecdotes anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
      <Footer />
    </>
  );
}

export default App;
