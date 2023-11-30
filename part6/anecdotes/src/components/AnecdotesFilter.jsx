import { useDispatch } from "react-redux";
import { applyFilter } from "../reducers/filterReducer";

const AnecdotesFilter = () => {
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    dispatch(applyFilter(e.target.value));
  };

  return (
    <div style={{ marginBottom: 15 }}>
      <h2>filter</h2>
      filter <input onChange={handleFilter} />
    </div>
  );
};

export default AnecdotesFilter;
