import Header from "./components/Header";

function App() {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
    </div>
  );
}

export default App;
