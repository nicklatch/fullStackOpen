import Part from "./Part";

const Content = ({ courseParts }) => {
  console.log(Object.values(courseParts));
  return (
    <>
      {courseParts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

export default Content;
