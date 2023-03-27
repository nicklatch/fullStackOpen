const App = () => {
  const course = "Half Stack application development";
  const parts = [
    { part: "Fundamentals of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 },
  ];
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises; // need to make this usable with abitrary amount of parts objects

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={total} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  console.log(props.parts);
  return (
    <div>
      <p>
        {props.parts[0].part} {props.parts[0].exercises}
      </p>
      <p>
        {props.parts[1].part} {props.parts[1].exercises}
      </p>
      <p>
        {props.parts[2].part} {props.parts[2].exercises}
      </p>
    </div>
  );
};

const Total = (props) => {
  console.log(props);
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  );
};

export default App;
