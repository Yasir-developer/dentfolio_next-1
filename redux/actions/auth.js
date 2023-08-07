export const fetchUser = (data) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_USER_SUCCESS', payload: data });
  };
};

export const fetchUpdatedUser = (data) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_UPDATED_USER_SUCCESS', payload: data });
  };
};
export const resetUser = (data) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_USER_SUCCESS', payload: {} });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_USER_LOGOUT', payload: null });
  };
};
