/** @format */
export const saveFiles = (data) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_FILES', payload: data });
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
