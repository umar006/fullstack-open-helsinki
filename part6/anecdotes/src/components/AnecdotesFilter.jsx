import { useDispatch } from "react-redux";

const AnecdotesFilter = () => {
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    dispatch({ type: "SET_FILTER", payload: e.target.value });
  };

  return (
    <div style={{ marginBottom: 15 }}>
      <h2>filter</h2>
      filter <input onChange={handleFilter} />
    </div>
  );
};

export default AnecdotesFilter;
