import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const Toggle = forwardRef((props, refs) => {
  const [visibility, setVisiblity] = useState(false);

  const hiddenVisibility = {
    display: visibility ? 'none' : '',
    marginBottom: '1rem',
  };
  const shownVisibility = { display: visibility ? '' : 'none' };

  const toggleVisibility = () => {
    setVisiblity(!visibility);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <button style={hiddenVisibility} onClick={toggleVisibility}>
        {props.buttonLabelOne}
      </button>
      <div style={shownVisibility}>
        {props.children}
        <button onClick={toggleVisibility}>{props.buttonLabelTwo}</button>
      </div>
    </>
  );
});

Toggle.displayName = 'Toggle';

Toggle.propTypes = {
  buttonLabelOne: PropTypes.string.isRequired,
  buttonLabelTwo: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Toggle;
