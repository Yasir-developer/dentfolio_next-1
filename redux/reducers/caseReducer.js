/** @format */
const initialState = {
  imageFiles: {},
  // loading: false,
  // error: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FILES':
      return { ...state, loading: false, imageFiles: action.payload };
    case 'FETCH_USER_LOGOUT':
      return { ...state, loading: false, user: null };
    default:
      return state;
  }
};

export default authReducer;
