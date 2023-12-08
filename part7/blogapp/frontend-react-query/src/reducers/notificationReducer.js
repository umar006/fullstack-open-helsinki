const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

export const successMessage = (message) => {
  return {
    type: "SET",
    payload: {
      success: message,
      error: null,
    },
  };
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

export const nullMessage = () => {
  return {
    type: "SET",
    payload: null,
  };
};

export default notificationReducer;
