const Heading = ({ text, headingLevel }) => {
  const LevelOfHeading = headingLevel;
  return <LevelOfHeading>{text}</LevelOfHeading>;
};

export default Heading;
