const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

export const errorMessage = (message) => {
  return {
    type: "SET",
    payload: {
      error: message,
      success: null,
    },
  };
};

export default notificationReducer;
