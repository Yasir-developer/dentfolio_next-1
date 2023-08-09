/** @format */
const initialState = {
  dentist: [],
  profile: {},
  location: '',
  city: '',
  updatedUser: {},
  loading: false,
  error: '',
};

const dentistReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DENTIST_SEARCH_SUCCESS':
      return { ...state, loading: false, dentist: action.payload };
    case 'DENTIST_LOCATION':
      return { ...state, location: action.payload };
    case 'DENTIST_SEARCH_CITY':
      return { ...state, city: action.payload };
    case 'DENTIST_PROFILE_DATA':
      return { ...state, profile: action.payload };
    case 'DENTIST_SEARCH_FAIL':
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default dentistReducer;
