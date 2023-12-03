import { useEffect, useState } from "react";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import About from "./components/About";
import AnecdoteDetail from "./components/AnecdoteDetail";
import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/Anecdotes";
import Footer from "./components/Footer";
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

  const padding = { padding: 8 };

  const matchAnecdoteDetail = useMatch("/anecdotes/:id");
  const anecdote = matchAnecdoteDetail
    ? anecdotes.find(
        (anecdote) => anecdote.id === Number(matchAnecdoteDetail.params.id),
      )
    : null;

  return (
    <>
      <h1>Software anecdotes</h1>
      <div>
        <Link style={padding} to={"/"}>
          anecdotes
        </Link>
        <Link style={padding} to={"/create"}>
          create new
        </Link>
        <Link style={padding} to={"/about"}>
          about
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
          path="/anecdotes/:id"
          element={<AnecdoteDetail anecdote={anecdote} />}
        />
        <Route
          path="/create"
          element={
            <AnecdoteForm anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
