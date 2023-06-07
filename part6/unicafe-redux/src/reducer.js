const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'GOOD':
      state.good + 1;
      return state;
    case 'OK':
      console.log(state.ok + 1);
      return state.ok + 1;
    case 'BAD':
      console.log(state.bad + 1);
      return state.bad + 1;
    case 'ZERO':
      return (state = initialState);
    default:
      return state;
  }
};

export default counterReducer;
