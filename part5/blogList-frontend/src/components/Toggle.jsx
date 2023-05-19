import { forwardRef, useImperativeHandle, useState } from 'react';

const Toggle = forwardRef((props, refs) => {
  const [visibility, setVisiblity] = useState(false);

  const hiddenVisibility = { display: visibility ? 'none' : '' };
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
    <div>
      <div style={hiddenVisibility}>
        <button onClick={toggleVisibility}>{props.buttonLabelOne}</button>
      </div>
      <div style={shownVisibility}>
        {props.children}
        <button onClick={toggleVisibility}>{props.buttonLabelTwo}</button>
      </div>
    </div>
  );
});

export default Toggle;
