const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
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
  return (
    <>
      <p>
        {props.parts[1]} {props.exercises[1]}
      </p>
      <p>
        {props.parts[2]} {props.exercises[2]}
      </p>
      <p>
        {props.parts[3]} {props.exercises[3]}
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
