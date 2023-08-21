/** @format */
const initialState = {
  user: {},
  updatedUser: {},
  loading: false,
  error: '',
  modal: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'FETCH_UPDATED_USER_SUCCESS':
      return { ...state, loading: false, updatedUser: action.payload };

    case 'OPEN_MODAL':
      return { ...state, modal: true };
    case 'FETCH_USER_LOGOUT':
      return { ...state, loading: false, user: null };
    default:
      return state;
  }
};

export default authReducer;
