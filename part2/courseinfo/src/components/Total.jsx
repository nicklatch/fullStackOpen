const Total = ({ courseParts }) => {
  const exercisesArr = courseParts.map((part) => part.exercises);

  return (
    <p>
      <strong>
        total of {exercisesArr.reduce((curr, acc) => curr + acc)} exercises
      </strong>
    </p>
  );
};

export default Total;
