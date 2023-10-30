const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
  };
  const part2 = {
    name: "Using props to pass data",
  };
  const part3 = {
    name: "State of a component",
  };
  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        parts={{ 1: part1, 2: part2, 3: part3 }}
        exercises={{ 1: exercises1, 2: exercises2, 3: exercises3 }}
      />
      <Total exercises={{ 1: exercises1, 2: exercises2, 3: exercises3 }} />
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
      <Part name={parts[1].name} exercise={props.exercises[1]} />
      <Part name={parts[2].name} exercise={props.exercises[2]} />
      <Part name={parts[3].name} exercise={props.exercises[3]} />
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
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.exercises[1] + props.exercises[2] + props.exercises[3]}
      </p>
    </>
  );
};

export default App;
