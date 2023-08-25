import React, { useEffect, useState } from 'react';
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { server } from 'config';
import { toast } from 'react-hot-toast';
import Router from 'next/router';
import { fetchUser } from 'redux/actions/auth';
import AuthInput from '@/components/Inputs/AuthInput';
import AddressForm from '@/components/AddressForm/AddressForm';

const CheckoutForm = (props) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  console.log(user, 'props props');

  const [loader, setLoader] = useState(false);
  const [address, setAddress] = useState('');
  useEffect(() => {}, [address]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);

    const { stripe, elements, loading } = props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    // console.log(CardElement, 'CardElement');
    console.log(card, 'card');
    const result = await stripe.createToken(card);
    if (result.error) {
      toast.error(result.error.message);
      setLoader(false);

      console.log(result.error.message);
    } else {
      console.log(result, 'result ----');
      // return;
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      axios
        .post(`${server}/api/subscription`, {
          dentistId: user._id,
          name: user.firstName,
          email: user.email,
          token: result.token.id,
          city: address.address.city,
          line1: address.address.line1,
          line2: address.address.line2,
          country: address.address.country,
          postal_code: address.address.postal_code,
          subscrption_type: '',
          customer_id: '',
          payment_id: '',

          options,
        })
        .then((res) => {
          // console.log(res, 'job post response..');
          // return;
          if (res.status == 200) {
            dispatch(fetchUser(res?.data?.user));
            handleSave();
            // console.log(res, 'subs res');
            //   setLoader(false);

            setLoader(false);

            //   emptFields();
            Router.replace('/dentist/view-profile');
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

  const handleSave = (e) => {
    // e.preventDefault();

    axios
      .patch(`${server}/api/subscription`, {
        id: user?._id,
        paymentVerified: true,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        // console.log(res, 'res after update');
        // setLoader(false);
        if (res.status == 200) {
          toast.success('Subscription Created Successfully');
        }
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error?.data?.message);
      });
  };

  const handleAddressChange = (newAddress) => {
    console.log(newAddress, 'newAddress');
    setAddress(newAddress);
  };
  return (
    <div>
      <div class="product-info mb-3">
        <p className="font-semibold text-center !text-[16px]">
          Payment Details
        </p>
      </div>
      <p className="text-left text-[14px] mb-3">
        This is to verify your Account, you will not be charged during your 30
        days free trial
      </p>
      <form onSubmit={handleSubmit}>
        {/* Card Holder Full Name */}
        {/* <AuthInput
          className={'!w-[90%] mx-3 border-gray-300'}
          placeholder="Card Holder Full Name"
        /> */}
        <CardSection />
        <AddressForm onAddressChange={handleAddressChange} />
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
          <button className="btn-pay" disabled={!props.stripe}>
            Continue
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
        <CheckoutForm
          stripe={stripe}
          elements={elements}
          // onSubmit={props.onSubmit(e)}
        />
      )}
    </ElementsConsumer>
  );
}
