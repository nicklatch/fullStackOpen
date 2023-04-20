const Heading = ({ headingLevel, text }) => {
  const LevelOfHeading = headingLevel;
  return <LevelOfHeading>{text}</LevelOfHeading>;
};

export default Heading;
