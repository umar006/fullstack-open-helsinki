import { useSelector } from "react-redux";
import Anecdotes from "./Anecdotes";

const App = () => {
  const anecdotes = useSelector((state) => state);

  return <Anecdotes anecdotes={anecdotes} />;
};

export default App;
