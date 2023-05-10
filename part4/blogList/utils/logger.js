const isNotTest = process.env.NODE_ENV !== 'test';

const info = (...params) => {
  if (isNotTest) {
    console.log(...params);
  }
};

const error = (...params) => {
  if (isNotTest) {
    console.error(...params);
  }
};

module.exports = {
  error,
  info,
};
