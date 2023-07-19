/** @format */
const initialState = {
  user: {},
  loading: false,
  error: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "FETCH_USER_LOGOUT":
      return { ...state, loading: false, user: null };
    default:
      return state;
  }
};

export default authReducer;
