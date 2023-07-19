import { combineReducers } from "redux";
// import counterReducer from "./counterReducer";
import authReducer from "./authReducer";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type == "FETCH_USER_LOGOUT") {
    storage.removeItem("persist:primary");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
