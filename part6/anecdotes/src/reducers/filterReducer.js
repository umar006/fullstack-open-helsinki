const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const applyFilter = (query) => {
  return {
    type: "SET_FILTER",
    payload: query,
  };
};

export default filterReducer;
