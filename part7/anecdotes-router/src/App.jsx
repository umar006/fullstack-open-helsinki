import { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./components/About";
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
            path="/create"
            element={
              <AnecdoteForm anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
