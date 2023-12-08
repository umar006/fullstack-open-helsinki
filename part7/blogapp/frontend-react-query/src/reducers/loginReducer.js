const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export const loginUser = (user) => {
  return {
    type: "LOGIN",
    payload: user,
  };
};

export default loginReducer;
