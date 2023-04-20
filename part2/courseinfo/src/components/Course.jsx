import Content from "./Content";
import JSHeader from "./JSHeader";
import Total from "./Total";

const Course = ({ course }) => {
  //
  //
  return (
    <>
      <JSHeader courseName={course.name} />
      <Content courseParts={course.parts} />
      <Total courseParts={course.parts} />
    </>
  );
};

export default Course;
