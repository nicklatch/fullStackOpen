const App = () => {
  const course =
  {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (header) => {
  console.log(header.course);
  return <h1>{header.course}</h1>;
};

const Content = (content) => {
  return (
    <div>
      <Part part={content.parts[0]} />
      <Part part={content.parts[1]} />
      <Part part={content.parts[2]} />
    </div>
  );
};

const Part = (part) => {
  console.log(part.part);
  return (
    <>
      <p>
        {part.part.name} {part.part.exercises}
      </p>
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts.reduce((curr, { exercises }) => curr + exercises, 0)}</p>
    </>
  );
};

export default App;
