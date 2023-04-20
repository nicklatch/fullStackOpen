import Content from "./Content";
import Heading from "./Heading";
import Total from "./Total";

const Course = ({ course }) => {
  //
  //
  return (
    <>
      <Heading text={course.name} headingLevel="h2" />
      <Content courseParts={course.parts} />
      <Total courseParts={course.parts} />
    </>
  );
};

export default Course;
