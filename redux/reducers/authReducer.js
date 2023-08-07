/** @format */
const initialState = {
  user: {},
  updatedUser: {},
  loading: false,
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'FETCH_UPDATED_USER_SUCCESS':
      return { ...state, loading: false, updatedUser: action.payload };
    case 'FETCH_USER_LOGOUT':
      return { ...state, loading: false, user: null };
    default:
      return state;
  }
};

export default authReducer;
