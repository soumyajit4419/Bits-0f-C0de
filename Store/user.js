const initialState = {
  user: undefined,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_USER": {
      return { ...state, user: action.payload };
    }
    case "REMOVE_USER": {
      return { ...state, user: undefined };
    }
    default:
      return state;
  }
};
