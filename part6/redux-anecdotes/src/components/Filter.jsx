import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch;
  const handleChange = (event) => {
    dispatch(event.target.value);
  };
  return (
    <>
      <label htmlFor="filter">Filter </label>
      <input type="search" id="filter" name="filter" onChange={handleChange} />
    </>
  );
};

export default Filter;
