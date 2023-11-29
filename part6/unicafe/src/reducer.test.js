import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe counterReducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return proper initial state when called with undefined state", () => {
    const action = {
      type: "DO_NOTHING",
    };

    const newState = counterReducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  test("good is incremented by 1", () => {
    const state = initialState;
    const action = {
      type: "GOOD",
    };

    deepFreeze(state);
    const newState = counterReducer(state, action);

    expect(newState).toEqual({ good: 1, ok: 0, bad: 0 });
  });
});
