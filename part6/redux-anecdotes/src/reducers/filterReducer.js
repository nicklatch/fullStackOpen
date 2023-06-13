const filterReducer = (state = 'ALL', action = 'ALL') => {
  switch (action.type) {
    case 'SEARCH':
      console.log(state, ' and ', action.type);
      return action.payload;
    default:
      return state;
  }
};

export const setFilterChange = (filter) => {
  return {
    type: 'SEARCH',
    payload: filter,
  };
};

export default filterReducer;
