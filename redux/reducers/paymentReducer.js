/** @format */
const initialState = {
  change: false,
  paymentMethods: [],
  paydata: [],
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLE_MODAL':
      return { ...state, change: action.payload };
    case 'PAYMENT_METHOD_SUCCESS':
      return { ...state, paymentMethods: action.payload };

    case 'PAYMENT_METHOD_DATA':
      return { ...state, paydata: action.payload };
    default:
      return state;
  }
};

export default paymentReducer;
