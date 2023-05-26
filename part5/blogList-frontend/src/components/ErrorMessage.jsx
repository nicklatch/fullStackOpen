import PropTypes from 'prop-types';

const ErrorMessage = ({ errorMessage }) => {
  return errorMessage && <div className='error'>{errorMessage}</div>;
};

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};

export default ErrorMessage;
