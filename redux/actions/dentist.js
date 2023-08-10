import axios from 'axios';
import { server } from 'config';

export const searchDentist = (data) => {
  // console.log(data, 'searchDentist in action');
  return (dispatch) => {
    const url = `${server}/api/dentists`;

    axios
      .post(url, data)
      .then((res) => {
        // console.log(res, 'Dentist search res');
        DentistSearchSuccess(dispatch, res);
      })
      .catch((err) => {
        DentistSearchFail(dispatch, err.message);
      });
  };
};

const DentistSearchSuccess = (dispatch, res) => {
  // console.log(res, 'post data res');
  dispatch({ type: 'DENTIST_SEARCH_SUCCESS', payload: res });
};
// export const DentistSearchSuccessReset = () => {
//   return (dispatch) => {
//     dispatch({ type: 'DENTIST_SEARCH_SUCCESS', payload: [] });
//   };
// };

export const dentistLocation = (location) => {
  // console.log(location, 'Location data res');
  return { type: 'DENTIST_LOCATION', payload: location };
};

export const dentistSearchCity = (city) => {
  // console.log(location, 'Location data res');
  return { type: 'DENTIST_SEARCH_CITY', payload: city };
};
export const dentistProfile = (data) => {
  // console.log(data, 'Location data res');
  return { type: 'DENTIST_PROFILE_DATA', payload: data };
};

const DentistSearchFail = (dispatch, res) => {
  //console.log(res, 'post data res');
  dispatch({ type: 'DENTIST_SEARCH_FAIL', payload: res });
};
