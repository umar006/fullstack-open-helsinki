const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={{ 1: part1, 2: part2, 3: part3 }} />
      <Total parts={{ 1: part1, 2: part2, 3: part3 }} />
    </div>
  );
};

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = (props) => {
  const parts = props.parts;
  return (
    <>
      <Part name={parts[1].name} exercise={parts[1].exercises} />
      <Part name={parts[2].name} exercise={parts[2].exercises} />
      <Part name={parts[3].name} exercise={parts[3].exercises} />
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.exercise}
      </p>
    </>
  );
};

const Total = (props) => {
  const parts = props.parts;
  return (
    <>
      <p>
        Number of exercises{" "}
        {parts[1].exercises + parts[2].exercises + parts[3].exercises}
      </p>
    </>
  );
};

export default App;
