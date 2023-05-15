const ErrorMessage = ({ errorMessage }) => {
  return errorMessage && <div className='error'>{errorMessage}</div>;
};

export default ErrorMessage;
