import { forwardRef, useImperativeHandle, useState } from 'react';

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

export default Toggle;
