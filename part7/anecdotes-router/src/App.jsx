import { useState } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/Anecdotes";
import Footer from "./components/Footer";
import { useEffect } from "react";
import anecdoteServices from "./services/anecdoteServices";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
      <Router>
        <h1>Software anecdotes</h1>
        <div>
          <Link to={"/"}>anecdotes</Link>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Anecdotes anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
            }
          />
        </Routes>
        <AnecdoteForm anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
        <Footer />
      </Router>
    </>
  );
}

export default App;
