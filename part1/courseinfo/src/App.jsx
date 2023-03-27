const App = () => {
  const course = "Half Stack application development";
  const parts = [
    { title: "Fundamentals of React", exercises: 10 },
    { title: "Using props to pass data", exercises: 7 },
    { title: "State of a component", exercises: 14 },
  ];
  const total = parts.reduce((curr, { exercises }) => curr + exercises, 0);

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
  //needs refactor to add as many parts as there are parts indxes
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
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
      <p>Number of exercises {props.total}</p>
    </>
  );
};

export default App;
