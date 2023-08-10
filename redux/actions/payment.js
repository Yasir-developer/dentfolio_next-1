/** @format */

import axios from 'axios';
// import { apiActiveURL, appId, appKey } from "../../ApiBaseURL";
import { server } from 'config';

export const PaymentMethods = (data) => {
  // const SessionData = JSON.parse(localStorage.getItem("SessionData"));
  // const subrub = localStorage.getItem("subrub");
  // const area = localStorage.getItem("area");
  // console.log(data, "area area");
  var config = {
    url: `${server}/api/paymentMethods/${data.id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return (dispatch) => {
    axios(config).then((res) => {
      // console.log(res, "Category response");

      if (res.status == 200) {
        // console.log("kasdmaskjdsak");
        // console.log(
        //   res.data.paymentMethods.data,
        //   'res.data.paymentMethods.data'
        // );
        PaymentMethodSuccess(dispatch, res.data.paymentMethods.data);
      } else {
        // console.log(res.data.message, "res.data.messageres.data.message");
        // CategoryFail(dispatch, res.data.message);
      }
    });
    // .catch((e) => CategoryFail(dispatch, e.message));
  };
};

export const ResetCategory = () => {
  return (dispatch) => {
    dispatch({ type: 'CATEGORY_SUCCESS', payload: null });
  };
};
export const PaymentMethodData = (res) => {
  //console.log(res, 'post data res');
  return { type: 'PAYMENT_METHOD_DATA', payload: res };
};
const PaymentMethodSuccess = (dispatch, res) => {
  //console.log(res, 'post data res');
  dispatch({ type: 'PAYMENT_METHOD_SUCCESS', payload: res });
};

const CategoryFail = (dispatch, res) => {
  // console.log(res, "res error");
  dispatch({ type: 'CATEGORY_FAIL', payload: res });
};
export const ResetCategoryFail = () => {
  return (dispatch) => {
    dispatch({ type: 'CATEGORY_FAIL', payload: null });
  };
};
export const handleModal = (data) => {
  return (dispatch) => {
    dispatch({ type: 'HANDLE_MODAL', payload: data });
  };
};

export const fetchUpdatedCardList = (data) => {
  return (dispatch) => {
    dispatch({ type: 'HANDLE_MODAL', payload: data });
  };
};
