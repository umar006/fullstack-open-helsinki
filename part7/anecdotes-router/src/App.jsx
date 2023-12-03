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

  const padding = { padding: 8 };

  return (
    <>
      <Router>
        <h1>Software anecdotes</h1>
        <div>
          <Link style={padding} to={"/"}>
            anecdotes
          </Link>
          <Link style={padding} to={"/create"}>
            create new
          </Link>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <Anecdotes anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
            }
          />
          <Route
            path="/create"
            element={
              <AnecdoteForm anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
