import { combineReducers } from 'redux';
// import counterReducer from "./counterReducer";
import authReducer from './authReducer';
import storage from 'redux-persist/lib/storage';
import paymentReducer from './paymentReducer';
import dentistReducer from './dentistReducer';

const appReducer = combineReducers({
  auth: authReducer,
  payment: paymentReducer,
  dentist: dentistReducer,
});

const rootReducer = (state, action) => {
  if (action.type == 'FETCH_USER_LOGOUT') {
    storage.removeItem('persist:primary');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
