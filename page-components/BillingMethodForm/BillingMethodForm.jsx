import React, { useState } from 'react';
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';

import CardSection from '../../page-components/Checkout/CardSection';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { server } from 'config';
import { toast } from 'react-hot-toast';
import Router from 'next/router';
import {
  PaymentMethodData,
  PaymentMethods,
  handleModal,
} from 'redux/actions/payment';

const BillingMethodForm = ({ stripe, elements }) => {
  //   console.log(props, 'props props');
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { change } = useSelector((state) => state.payment);

  const [loader, setLoader] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  // console.log(change, 'changechang');
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);

    // const { stripe, elements, modal } = props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    // console.log(CardElement, 'CardElement');
    // console.log(card, 'card');
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
      toast.error(result.error.message);
      setLoader(false);
    } else {
      // console.log(result, 'result ----');
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const data = {
        id: user.customer_id,
      };
      axios
        .post(`${server}/api/paymentMethods`, {
          dentistId: user._id,
          name: user.name,
          email: user.email,
          token: result.token.id,
          options,
        })
        .then((res) => {
          // console.log(res, 'Billing Method Form response..');
          // return;
          if (res.status == 200) {
            setLoader(false);
            // console.log(res, 'subs res ---');
            //   setLoader(false);
            dispatch(PaymentMethodData(res.data.paymentMethods.data));

            toast.success('Billing Method Added Successfully');
            dispatch(handleModal(false));
            // handleClick(false);
            setShowPaymentModal(false);
            dispatch(PaymentMethods(data));

            //   emptFields();
            // Router.replace('/dentist/view-profile');
          } else if (res.status == 400) {
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          setLoader(false);
          console.log(error, 'erroorrr');
        });
    }
  };

  return (
    <div>
      <div class="product-info"></div>
      <form onSubmit={handleSubmit}>
        <CardSection />
        {loader ? (
          <div
            aria-label="Loading..."
            role="status"
            className="flex items-center justify-center"
          >
            <svg class="h-5 w-5 animate-spin" viewBox="3 3 18 18">
              <path
                class="fill-indigo-200"
                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
              ></path>
              <path
                className="fill-[#0769cc]"
                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
              ></path>
            </svg>
            {/* </div> */}
          </div>
        ) : (
          <button className="btn-pay" disabled={!stripe}>
            Add Billing Method
          </button>
        )}
      </form>
    </div>
  );
};

export default function InjectedCheckoutForm(props) {
  // console.log(props, 'props');

  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <BillingMethodForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
