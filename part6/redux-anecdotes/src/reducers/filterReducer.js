const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SEARCH':
      return action.payload;
    default:
      return state;
  }
};

export const setFilterilterChange = (filter) => {
  return {
    type: 'SEARCH',
    payload: filter,
  };
};

export default filterReducer;
