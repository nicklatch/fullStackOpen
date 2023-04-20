import Content from "./Content";
import JSHeader from "./JSHeader";

const Course = ({ course }) => {
  //
  //
  return (
    <>
      <JSHeader courseName={course.name} />
      <Content courseParts={course.parts} />
    </>
  );
};

export default Course;
