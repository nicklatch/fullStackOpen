import { useDispatch } from 'react-redux';
import { setFilterChange } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  return (
    <>
      <label htmlFor="filter">Filter </label>
      <input
        type="search"
        id="filter"
        name="filter"
        onChange={(event) => dispatch(setFilterChange(event.target.value))}
      />
    </>
  );
};

export default Filter;
