import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'ALL',
  reducers: {
    setFilterChange(state, action) {
      return action.payload;
    },
  },
});

export const { setFilterChange } = filterSlice.actions;
export default filterSlice.reducer;
