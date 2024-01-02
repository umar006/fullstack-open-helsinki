import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

function App() {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      id: 1,
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      id: 2,
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      id: 3,
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
}

export default App;
