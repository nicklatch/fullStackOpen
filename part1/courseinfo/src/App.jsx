const App = () => {
  const course = "Half Stack application development";
  const parts = [
    { title: "Fundamentals of React", exercises: 10 },
    { title: "Using props to pass data", exercises: 7 },
    { title: "State of a component", exercises: 14 },
  ];

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </>
  );
};

const Part = (props) => {
  console.log(props);
  return (
    <>
      <p>
        {props.part.title} {props.part.exercises}
      </p>
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.parts.reduce((curr, { exercises }) => curr + exercises, 0)}
      </p>
    </>
  );
};

export default App;
